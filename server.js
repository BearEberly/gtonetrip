import { createServer } from "node:http";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { existsSync, createReadStream } from "node:fs";
import { extname, join, normalize, relative, resolve } from "node:path";
import { createHmac, randomBytes, randomUUID, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { networkInterfaces } from "node:os";
import { promisify } from "node:util";
import {
  generateAuthenticationOptions,
  generateRegistrationOptions,
  verifyAuthenticationResponse,
  verifyRegistrationResponse
} from "@simplewebauthn/server";
import { buildICS } from "./calendar-feed.js";

const rootDir = resolve(".");
const dataDir = resolve(process.env.DATA_DIR || join(rootDir, "data"));
const bundledSeedPath = join(rootDir, "data", "seed-state.json");
const seedPath = existsSync(dataDir) ? join(dataDir, "seed-state.json") : bundledSeedPath;
const statePath = join(dataDir, "cabin-state.json");
const usersPath = join(dataDir, "users.json");
const port = Number(process.env.PORT || 8000);
const clients = new Set();
const scryptAsync = promisify(scryptCallback);

const APP_PASSCODE = (process.env.APP_PASSCODE || "").trim();
const APP_ADMIN_PASSCODE = (process.env.APP_ADMIN_PASSCODE || APP_PASSCODE).trim();
const IS_PRODUCTION = process.env.NODE_ENV === "production";
const SESSION_SECRET = (process.env.SESSION_SECRET || randomBytes(24).toString("hex")).trim();
const AUTH_HEADER = "x-cabin-passcode";
const AUTH_COOKIE_NAME = "cabin_trip_auth";
const AUTH_COOKIE_TTL = Number(process.env.AUTH_COOKIE_TTL || 60 * 60 * 24 * 30);
const PROFILE_COOKIE_NAME = "cabin_profile_session";
const PROFILE_COOKIE_TTL = Number(process.env.PROFILE_COOKIE_TTL || 60 * 60 * 24 * 30);
const RP_NAME = process.env.WEBAUTHN_RP_NAME || "Cabin Bring Board";
const PUBLIC_ORIGIN = (process.env.PUBLIC_ORIGIN || "").trim();

const AUTH_TOKEN = APP_PASSCODE ? `v1.${createAuthSignature(APP_PASSCODE)}` : "";
const ADMIN_AUTH_TOKEN = APP_ADMIN_PASSCODE ? `v1.${createAuthSignature(APP_ADMIN_PASSCODE)}` : AUTH_TOKEN;
const privateTripInfo = Object.freeze({
  address: "1018 Wawona Way, Arnold, CA 95223",
  neighborhood: "Sequoia Woods",
  propertySummary: "4 bed / 3 bath · about 2,430 sq ft · wooded half-acre lot",
  cityLabel: "Arnold, California",
  checkout: "Monday July 6 · time TBD",
  doorCode: "TBD",
  wifi: "TBD"
});
const attendeeCatalog = new Map([
  ["shell", { name: "Shell", firstName: "Shell", familyId: "shell" }],
  ["nick", { name: "Nick", firstName: "Nick", familyId: "nick" }],
  ["marissa", { name: "Marissa", firstName: "Marissa", familyId: "nick" }],
  ["bear", { name: "Bear", firstName: "Bear", familyId: "bear" }],
  ["jessica", { name: "Jessica", firstName: "Jessica", familyId: "bear" }],
  ["andy", { name: "Andy", firstName: "Andy", familyId: "nat" }],
  ["natalie", { name: "Natalie", firstName: "Natalie", familyId: "nat" }]
]);
const SHARED_LOGIN_PASSWORD = "1333";
const checklistIds = new Set([
  "shell-door-code",
  "shell-wifi",
  "shell-fridge",
  "shell-grill-type",
  "shell-pizza-oven",
  "shell-sequoia-access",
  "shell-checkout",
  "shell-trash",
  "gear-pizza-oven",
  "gear-blackstone",
  "gear-grill-type",
  "gear-propane",
  "gear-seasonings",
  "gear-board-games"
]);
const activityIds = new Set([
  "white-pines-lake",
  "lake-alpine",
  "sequoia-woods-pool",
  "arnold-rim-valley-view",
  "arnold-rim-logging-museum",
  "calaveras-big-trees",
  "sequoia-woods-golf",
  "sequoia-woods-clubhouse",
  "white-pines-disc-golf",
  "sierra-logging-museum",
  "big-trees-market",
  "bistro-espresso",
  "ebbetts-pass-byway",
  "bear-valley-area"
]);
const allDayCodes = ["wed", "thu", "fri", "sat", "sun", "mon"];

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".ico": "image/x-icon"
};

let sharedState = await loadState();
let authStore = await loadAuthStore();
let writeQueue = Promise.resolve();
let authWriteQueue = Promise.resolve();

function createAuthSignature(value) {
  return createHmac("sha256", SESSION_SECRET).update(String(value)).digest("base64url");
}

function loadJsonSafely(path, fallback) {
  return readFile(path, "utf8").then((payload) => JSON.parse(payload)).catch(() => fallback);
}

function loadSeedState() {
  return loadJsonSafely(seedPath, null).then((fromDataSeed) => fromDataSeed || loadJsonSafely(bundledSeedPath, null));
}

function loadState() {
  return mkdir(dataDir, { recursive: true }).then(async () => {
    const fromState = await loadJsonSafely(statePath, null);
    if (fromState) return fromState;

    const fromSeed = await loadSeedState();
    return fromSeed;
  }).then((next) => normalizeState(next || {}));
}

function loadAuthStore() {
  return mkdir(dataDir, { recursive: true }).then(async () => {
    const fromDisk = await loadJsonSafely(usersPath, null);
    return normalizeAuthStore(fromDisk || {});
  });
}

function normalizeAuthStore(store) {
  return {
    version: Number(store.version || 1),
    updatedAt: store.updatedAt || new Date().toISOString(),
    users: Array.isArray(store.users) ? store.users.map(normalizeUser).filter(Boolean) : [],
    challenges: store.challenges && typeof store.challenges === "object" ? store.challenges : {}
  };
}

function normalizeUser(user) {
  const email = normalizeEmail(user.email);
  if (!email) return null;
  const personId = personSafe(user.personId);
  const person = attendeeCatalog.get(personId);
  const familyId = familySafe(user.familyId) || person?.familyId || "";
  return {
    id: textSafe(user.id) || randomUUID(),
    personId,
    firstName: textSafe(user.firstName, person?.firstName || "Guest").slice(0, 60),
    email,
    familyId,
    password: user.password && typeof user.password === "object" ? user.password : null,
    passkeys: Array.isArray(user.passkeys) ? user.passkeys.map(normalizePasskey).filter(Boolean) : [],
    createdAt: user.createdAt || new Date().toISOString(),
    updatedAt: user.updatedAt || new Date().toISOString(),
    lastLoginAt: user.lastLoginAt || ""
  };
}

function normalizePasskey(passkey) {
  if (!passkey || !passkey.id || !passkey.publicKey) return null;
  return {
    id: String(passkey.id),
    publicKey: String(passkey.publicKey),
    counter: Number(passkey.counter || 0),
    transports: Array.isArray(passkey.transports) ? passkey.transports.map(String) : [],
    credentialDeviceType: passkey.credentialDeviceType || "",
    credentialBackedUp: Boolean(passkey.credentialBackedUp),
    name: textSafe(passkey.name, "Passkey").slice(0, 80),
    createdAt: passkey.createdAt || new Date().toISOString(),
    lastUsedAt: passkey.lastUsedAt || ""
  };
}

function normalizeState(state) {
  return {
    version: Number(state.version || 1),
    updatedAt: state.updatedAt || new Date().toISOString(),
    meals: Array.isArray(state.meals) ? state.meals.map(normalizeMealRecord).filter(Boolean) : [],
    supplies: Array.isArray(state.supplies) ? state.supplies.map(normalizeSupplyRecord).filter(Boolean) : [],
    familyChecks: state.familyChecks && typeof state.familyChecks === "object" ? state.familyChecks : {},
    familyResponses: state.familyResponses && typeof state.familyResponses === "object" ? state.familyResponses : {},
    activityVotes: normalizeActivityVotes(state.activityVotes),
    activityVoters: normalizeActivityVoters(state.activityVoters),
    checklists: normalizeChecklists(state.checklists)
  };
}

function legacyBringingDefaults(item = {}) {
  const id = String(item.id || "");
  const map = {
    plates: { mealType: "any", days: allDayCodes, type: "table" },
    napkins: { mealType: "any", days: allDayCodes, type: "table" },
    smores: { mealType: "dessert", days: ["fri", "sat"], type: "food" },
    bacon: { mealType: "breakfast", days: ["fri", "sat"], type: "food" },
    eggs: { mealType: "breakfast", days: ["fri", "sat", "sun"], type: "food" },
    steaks: { mealType: "dinner", days: ["fri"], type: "food" },
    "other-meats": { mealType: "dinner", days: ["sun"], type: "food" },
    "hot-dogs-buns": { mealType: "dinner", days: ["sat"], type: "food" },
    "blackstone-two-burner": { mealType: "any", days: ["fri", "sat", "sun"], type: "gear" },
    cranium: { mealType: "any", days: ["fri", "sat", "sun"], type: "gear" },
    charades: { mealType: "any", days: ["fri", "sat", "sun"], type: "gear" },
    "sparkling-ice": { mealType: "any", days: ["fri", "sat", "sun"], type: "drink" },
    "orange-juice": { mealType: "breakfast", days: ["fri", "sat", "sun"], type: "drink" }
  };
  const matched = map[id];
  if (matched) return matched;
  if (item.type === "gear") return { mealType: "any", days: ["fri", "sat", "sun"], type: "gear" };
  if (item.type === "cold") return { mealType: "any", days: ["fri", "sat", "sun"], type: "food" };
  return { mealType: "any", days: [], type: "table" };
}

function normalizeMealRecord(meal) {
  if (!meal || typeof meal !== "object") return null;
  const day = daySafe(meal.day);
  return {
    id: textSafe(meal.id) || `meal-${Date.now()}`,
    day,
    dayLabel: textSafe(meal.dayLabel, dayLabelFor(day)),
    type: textSafe(meal.type, "Meal"),
    time: textSafe(meal.time, "Flexible"),
    owner: familySafe(meal.owner),
    idea: textSafe(meal.idea),
    kids: textSafe(meal.kids),
    cold: Array.isArray(meal.cold) ? meal.cold.map((item) => textSafe(item)).filter(Boolean).slice(0, 8) : [],
    custom: Boolean(meal.custom),
    createdBy: familySafe(meal.createdBy),
    createdAt: textSafe(meal.createdAt, ""),
    updatedAt: textSafe(meal.updatedAt, "")
  };
}

function normalizeSupplyRecord(item) {
  if (!item || typeof item !== "object") return null;
  const legacy = legacyBringingDefaults(item);
  const owner = familySafe(item.owner);
  const notes = textSafe(item.notes || item.qty || "", "");
  return {
    id: textSafe(item.id) || `supply-${Date.now()}`,
    name: textSafe(item.name),
    notes,
    qty: notes,
    type: bringingTypeSafe(item.type || legacy.type),
    owner,
    mealType: mealTypeSafe(item.mealType || legacy.mealType),
    days: dayListSafe(item.days, legacy.days),
    image: imageDataUrlSafe(item.image || item.imageDataUrl || ""),
    custom: Boolean(item.custom),
    createdBy: familySafe(item.createdBy) || owner,
    createdAt: textSafe(item.createdAt, ""),
    updatedAt: textSafe(item.updatedAt, "")
  };
}

function normalizeActivityVotes(value) {
  const next = {};
  if (!value || typeof value !== "object") return next;
  for (const id of activityIds) {
    if (!Object.hasOwn(value, id)) continue;
    next[id] = Math.max(0, Math.floor(Number(value[id]) || 0));
  }
  return next;
}

function normalizeActivityVoters(value) {
  const next = {};
  if (!value || typeof value !== "object") return next;
  for (const id of activityIds) {
    const raw = value[id];
    if (!raw || typeof raw !== "object") continue;
    const voters = {};
    for (const familyId of Object.keys(raw)) {
      const safeId = familySafe(familyId);
      if (safeId && raw[familyId]) voters[safeId] = true;
    }
    if (Object.keys(voters).length) next[id] = voters;
  }
  return next;
}

function normalizeChecklists(value) {
  const next = {};
  if (!value || typeof value !== "object") return next;
  for (const id of checklistIds) {
    if (Object.hasOwn(value, id)) next[id] = Boolean(value[id]);
  }
  return next;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function persistState() {
  const payload = JSON.stringify(sharedState, null, 2);
  writeQueue = writeQueue.then(() => writeFile(statePath, `${payload}\n`));
  return writeQueue;
}

function persistAuthStore() {
  authStore.updatedAt = new Date().toISOString();
  const payload = JSON.stringify(authStore, null, 2);
  authWriteQueue = authWriteQueue.then(() => writeFile(usersPath, `${payload}\n`));
  return authWriteQueue;
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store"
  });
  response.end(JSON.stringify(payload));
}

function sendNotFound(response) {
  response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
  response.end("Not found");
}

function sendUnauthorized(response) {
  sendJson(response, 401, {
    ok: false,
    changed: false,
    message: "Passcode required.",
    needsPasscode: true
  });
}

function sendProfileRequired(response) {
  sendJson(response, 401, {
    ok: false,
    changed: false,
    needsProfile: true,
    message: "Profile required."
  });
}

function sharedStatePayload() {
  return {
    state: sharedState,
    tripInfo: privateTripInfo
  };
}

function readRequestBody(request, maxBytes = 512 * 1024) {
  return new Promise((resolveBody, rejectBody) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > maxBytes) {
        rejectBody(new Error("Request body too large"));
        request.destroy();
      }
    });
    request.on("end", () => resolveBody(body));
    request.on("error", rejectBody);
  });
}

function broadcastState() {
  const payload = `event: state\ndata: ${JSON.stringify(sharedState)}\n\n`;
  for (const response of clients) {
    response.write(payload);
  }
}

function touchState() {
  sharedState.version += 1;
  sharedState.updatedAt = new Date().toISOString();
}

function familySafe(value) {
  const valid = new Set(["shell", "nick", "nat", "bear"]);
  return valid.has(value) ? value : "";
}

function personSafe(value) {
  const id = String(value || "").trim().toLowerCase();
  return attendeeCatalog.has(id) ? id : "";
}

function textSafe(value, fallback = "") {
  return String(value || fallback).trim().slice(0, 180);
}

function daySafe(value) {
  return ["wed", "thu", "fri", "sat", "sun", "mon"].includes(value) ? value : "sun";
}

function dayListSafe(value, fallback = []) {
  const list = Array.isArray(value) ? value : fallback;
  const next = [];
  for (const day of allDayCodes) {
    if (list.includes(day)) next.push(day);
  }
  return next;
}

function dayLabelFor(day) {
  return {
    wed: "Wed Jul 1",
    thu: "Thu Jul 2",
    fri: "Fri Jul 3",
    sat: "Sat Jul 4",
    sun: "Sun Jul 5",
    mon: "Mon Jul 6"
  }[daySafe(day)];
}

function mealTypeSafe(value) {
  const normalized = String(value || "").trim().toLowerCase();
  return ["breakfast", "lunch", "dinner", "dessert", "pack-up", "any"].includes(normalized) ? normalized : "any";
}

function bringingTypeSafe(value) {
  const normalized = String(value || "").trim().toLowerCase();
  if (["food", "drink", "gear", "table"].includes(normalized)) return normalized;
  if (normalized === "dry goods") return "table";
  if (normalized === "cold") return "food";
  return "food";
}

function imageDataUrlSafe(value) {
  const raw = String(value || "").trim();
  if (!raw.startsWith("data:image/")) return "";
  return raw.length <= 400000 ? raw : "";
}

function isCustomMealId(id) {
  return /^meal-\d+/.test(String(id || ""));
}

function isCustomSupplyId(id) {
  return /^supply-\d+/.test(String(id || ""));
}

function canManageCustomItem(item, actorFamilyId) {
  const familyId = familySafe(actorFamilyId);
  if (!item || !familyId) return false;
  const createdBy = familySafe(item.createdBy);
  const owner = familySafe(item.owner);
  if (createdBy) return createdBy === familyId || owner === familyId;
  return !owner || owner === familyId;
}

function getProvidedPasscode(request, url) {
  const headerPasscode = String(request.headers[AUTH_HEADER] || "").trim();
  const queryPasscode = (url && url.searchParams && url.searchParams.get("passcode")) ? String(url.searchParams.get("passcode")) : "";
  return headerPasscode || queryPasscode.trim();
}

function isTokenMatch(left, right) {
  if (!left || !right || left.length !== right.length) return false;
  return timingSafeEqual(Buffer.from(left), Buffer.from(right));
}

function parseCookie(header, name) {
  const fragments = String(header || "").split(";");
  for (const fragment of fragments) {
    const [rawKey, ...valueParts] = fragment.split("=");
    const key = rawKey.trim();
    if (key !== name) continue;
    return decodeURIComponent(valueParts.join("=") || "");
  }
  return "";
}

function setAuthCookie(request, response, token) {
  appendSetCookie(response, `${AUTH_COOKIE_NAME}=${token}; Path=/; Max-Age=${AUTH_COOKIE_TTL}; HttpOnly; SameSite=Strict${secureCookiePart(request)}`);
}

function appendSetCookie(response, cookie) {
  const existing = response.getHeader("set-cookie");
  if (!existing) {
    response.setHeader("set-cookie", cookie);
    return;
  }
  response.setHeader("set-cookie", Array.isArray(existing) ? [...existing, cookie] : [existing, cookie]);
}

function secureCookiePart(request) {
  const proto = String(request.headers["x-forwarded-proto"] || "").split(",")[0].trim();
  return proto === "https" || PUBLIC_ORIGIN.startsWith("https://") ? "; Secure" : "";
}

function setProfileCookie(request, response, user) {
  const token = createProfileSession(user.id);
  appendSetCookie(response, `${PROFILE_COOKIE_NAME}=${token}; Path=/; Max-Age=${PROFILE_COOKIE_TTL}; HttpOnly; SameSite=Lax${secureCookiePart(request)}`);
}

function clearProfileCookie(request, response) {
  appendSetCookie(response, `${PROFILE_COOKIE_NAME}=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax${secureCookiePart(request)}`);
}

function hasAuthForPasscode(request, token) {
  return isTokenMatch(parseCookie(request.headers.cookie || "", AUTH_COOKIE_NAME), token);
}

function ensureApiAuth(request, response, options = {}) {
  if (!APP_PASSCODE) return !IS_PRODUCTION;

  const passcode = options.passcode || "";
  if (passcode) {
    if (passcode === APP_ADMIN_PASSCODE) {
      setAuthCookie(request, response, ADMIN_AUTH_TOKEN);
      return true;
    }
    if (passcode === APP_PASSCODE) {
      setAuthCookie(request, response, AUTH_TOKEN);
      return true;
    }
  }

  const token = parseCookie(request.headers.cookie || "", AUTH_COOKIE_NAME);
  if (hasAuthForPasscode(request, ADMIN_AUTH_TOKEN)) return true;
  if (!options.admin && hasAuthForPasscode(request, AUTH_TOKEN)) return true;

  return false;
}

function createProfileSession(userId) {
  const payload = Buffer.from(JSON.stringify({
    sub: userId,
    exp: Math.floor(Date.now() / 1000) + PROFILE_COOKIE_TTL
  })).toString("base64url");
  const signature = createAuthSignature(payload);
  return `v1.${payload}.${signature}`;
}

function verifyProfileSession(token) {
  const [version, payload, signature] = String(token || "").split(".");
  if (version !== "v1" || !payload || !signature) return null;
  if (!isTokenMatch(signature, createAuthSignature(payload))) return null;
  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (!parsed.sub || Number(parsed.exp || 0) < Math.floor(Date.now() / 1000)) return null;
    return String(parsed.sub);
  } catch {
    return null;
  }
}

function catalogUserFromId(personId) {
  const safePersonId = personSafe(personId);
  const person = safePersonId ? attendeeCatalog.get(safePersonId) : null;
  if (!person && String(personId || "").startsWith("guest-")) {
    const firstName = textSafe(String(personId).slice(6), "Guest").replace(/-/g, " ").slice(0, 60);
    return {
      id: String(personId),
      personId: "",
      firstName,
      email: "",
      familyId: "",
      password: null,
      passkeys: [],
      createdAt: "",
      updatedAt: "",
      lastLoginAt: ""
    };
  }
  if (!person) return null;
  return {
    id: safePersonId,
    personId: safePersonId,
    firstName: person.firstName,
    email: "",
    familyId: person.familyId,
    password: null,
    passkeys: [],
    createdAt: "",
    updatedAt: "",
    lastLoginAt: ""
  };
}

function userFromFirstName(name) {
  const firstName = textSafe(name).slice(0, 60);
  if (!firstName) return null;
  const normalized = firstName.toLowerCase();
  const matched = Array.from(attendeeCatalog.entries()).find(([, person]) => person.firstName.toLowerCase() === normalized);
  if (matched) return catalogUserFromId(matched[0]);
  const slug = normalized.replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "guest";
  return catalogUserFromId(`guest-${slug}`);
}

function currentUser(request) {
  const userId = verifyProfileSession(parseCookie(request.headers.cookie || "", PROFILE_COOKIE_NAME));
  if (!userId) return null;
  return catalogUserFromId(userId);
}

function requireProfile(request, response) {
  const user = currentUser(request);
  if (user) return user;
  sendProfileRequired(response);
  return null;
}

function publicUser(user) {
  if (!user) return null;
  const person = attendeeCatalog.get(user.personId);
  return {
    id: user.id,
    personId: user.personId || "",
    personName: person?.name || "",
    firstName: user.firstName,
    email: user.email || "",
    familyId: user.familyId,
    hasPassword: Boolean(user.password),
    passkeyCount: user.passkeys?.length || 0,
    lastLoginAt: user.lastLoginAt || ""
  };
}

function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase().slice(0, 180);
}

function findUserByEmail(email) {
  const normalized = normalizeEmail(email);
  return authStore.users.find((user) => user.email === normalized) || null;
}

function findUserForProfile(email, personId) {
  const normalized = normalizeEmail(email);
  const safePersonId = personSafe(personId);
  if (!normalized) return null;
  if (safePersonId) {
    return authStore.users.find((user) => user.email === normalized && user.personId === safePersonId) || null;
  }
  return findUserByEmail(normalized);
}

async function hashPassword(password) {
  const salt = randomBytes(16).toString("base64url");
  const derived = await scryptAsync(String(password), salt, 64);
  return {
    type: "scrypt",
    salt,
    hash: Buffer.from(derived).toString("base64url")
  };
}

async function verifyPassword(user, password) {
  if (!user?.password?.hash || !user.password.salt) return false;
  const derived = await scryptAsync(String(password), user.password.salt, 64);
  const expected = Buffer.from(user.password.hash, "base64url");
  return expected.length === derived.length && timingSafeEqual(expected, derived);
}

function requestHostOrigin(request) {
  const proto = String(request.headers["x-forwarded-proto"] || "").split(",")[0].trim() || "http";
  const host = String(request.headers["x-forwarded-host"] || request.headers.host || "localhost").split(",")[0].trim();
  return `${proto}://${host}`;
}

function requestOrigin(request) {
  return PUBLIC_ORIGIN || requestHostOrigin(request);
}

function isAllowedRequestOrigin(request) {
  const origin = String(request.headers.origin || "").trim();
  if (!origin) return true;
  const allowedOrigins = new Set([requestHostOrigin(request), PUBLIC_ORIGIN].filter(Boolean));
  return allowedOrigins.has(origin);
}

function webAuthnConfig(request) {
  const origin = requestOrigin(request);
  const rpID = process.env.WEBAUTHN_RP_ID || new URL(origin).hostname;
  return { origin, rpID };
}

function credentialForVerify(passkey) {
  return {
    id: passkey.id,
    publicKey: Buffer.from(passkey.publicKey, "base64url"),
    counter: Number(passkey.counter || 0),
    transports: passkey.transports || []
  };
}

function rememberChallenge(id, data) {
  cleanupChallenges();
  authStore.challenges[id] = {
    ...data,
    expiresAt: Date.now() + 5 * 60 * 1000
  };
}

function takeChallenge(id, type) {
  cleanupChallenges();
  const challenge = authStore.challenges[id];
  if (!challenge || challenge.type !== type) return null;
  delete authStore.challenges[id];
  return challenge;
}

function cleanupChallenges() {
  const now = Date.now();
  for (const [id, challenge] of Object.entries(authStore.challenges || {})) {
    if (!challenge.expiresAt || challenge.expiresAt < now) delete authStore.challenges[id];
  }
}

async function handleMe(request, response, passcode) {
  if (!ensureApiAuth(request, response, { passcode })) {
    sendUnauthorized(response);
    return;
  }
  sendJson(response, 200, {
    ok: true,
    user: publicUser(currentUser(request)),
    profileCount: authStore.users.length,
    families: ["shell", "nick", "nat", "bear"]
  });
}

async function handleProfileContinue(request, response) {
  await handlePasswordLogin(request, response);
}

async function handlePasswordLogin(request, response) {
  const body = JSON.parse(await readRequestBody(request));
  if (!ensureApiAuth(request, response, { passcode: textSafe(body.passcode) })) {
    sendUnauthorized(response);
    return;
  }
  const user = userFromFirstName(body.firstName) || catalogUserFromId(body.personId);
  if (!user) {
    sendJson(response, 400, { ok: false, message: "Enter your first name." });
    return;
  }
  if (String(body.password || "") !== SHARED_LOGIN_PASSWORD) {
    sendJson(response, 401, { ok: false, message: "Password did not match." });
    return;
  }
  user.lastLoginAt = new Date().toISOString();
  setProfileCookie(request, response, user);
  sendJson(response, 200, { ok: true, user: publicUser(user), message: "Signed in." });
}

async function handleLogout(request, response) {
  clearProfileCookie(request, response);
  sendJson(response, 200, { ok: true, user: null, message: "Signed out." });
}

async function handlePasskeyRegisterOptions(request, response, passcode) {
  if (!ensureApiAuth(request, response, { passcode })) {
    sendUnauthorized(response);
    return;
  }
  const user = requireProfile(request, response);
  if (!user) return;
  const { origin, rpID } = webAuthnConfig(request);
  const options = await generateRegistrationOptions({
    rpName: RP_NAME,
    rpID,
    userName: user.email,
    userID: Buffer.from(user.id),
    userDisplayName: user.firstName,
    excludeCredentials: user.passkeys.map((passkey) => ({
      id: passkey.id,
      transports: passkey.transports
    })),
    authenticatorSelection: {
      residentKey: "preferred",
      userVerification: "required"
    },
    preferredAuthenticatorType: "localDevice"
  });
  const challengeId = randomUUID();
  rememberChallenge(challengeId, {
    type: "passkey-registration",
    userId: user.id,
    challenge: options.challenge,
    origin,
    rpID
  });
  await persistAuthStore();
  sendJson(response, 200, { ok: true, challengeId, options });
}

async function handlePasskeyRegisterVerify(request, response) {
  const body = JSON.parse(await readRequestBody(request));
  if (!ensureApiAuth(request, response, { passcode: textSafe(body.passcode) })) {
    sendUnauthorized(response);
    return;
  }
  const user = requireProfile(request, response);
  if (!user) return;
  const challenge = takeChallenge(textSafe(body.challengeId), "passkey-registration");
  if (!challenge || challenge.userId !== user.id) {
    sendJson(response, 400, { ok: false, message: "Passkey challenge expired." });
    return;
  }
  const verification = await verifyRegistrationResponse({
    response: body.response,
    expectedChallenge: challenge.challenge,
    expectedOrigin: challenge.origin,
    expectedRPID: challenge.rpID,
    requireUserVerification: true
  });
  if (!verification.verified || !verification.registrationInfo) {
    sendJson(response, 400, { ok: false, message: "Passkey could not be verified." });
    return;
  }
  const { credential, credentialDeviceType, credentialBackedUp } = verification.registrationInfo;
  user.passkeys = user.passkeys.filter((passkey) => passkey.id !== credential.id);
  user.passkeys.push({
    id: credential.id,
    publicKey: Buffer.from(credential.publicKey).toString("base64url"),
    counter: credential.counter,
    transports: body.response?.response?.transports || credential.transports || [],
    credentialDeviceType,
    credentialBackedUp,
    name: textSafe(body.name, "Apple passkey").slice(0, 80),
    createdAt: new Date().toISOString(),
    lastUsedAt: ""
  });
  user.updatedAt = new Date().toISOString();
  await persistAuthStore();
  sendJson(response, 200, { ok: true, user: publicUser(user), message: "Passkey added." });
}

async function handlePasskeyAuthOptions(request, response) {
  const body = JSON.parse(await readRequestBody(request));
  if (!ensureApiAuth(request, response, { passcode: textSafe(body.passcode) })) {
    sendUnauthorized(response);
    return;
  }
  const user = body.email ? findUserForProfile(body.email, body.personId) : null;
  const passkeys = user
    ? user.passkeys
    : authStore.users.flatMap((item) => item.passkeys);
  if (!passkeys.length) {
    sendJson(response, 404, { ok: false, message: "No passkeys are set up yet." });
    return;
  }
  const { origin, rpID } = webAuthnConfig(request);
  const options = await generateAuthenticationOptions({
    rpID,
    allowCredentials: user ? user.passkeys.map((passkey) => ({
      id: passkey.id,
      transports: passkey.transports
    })) : undefined,
    userVerification: "required"
  });
  const challengeId = randomUUID();
  rememberChallenge(challengeId, {
    type: "passkey-authentication",
    userId: user?.id || "",
    challenge: options.challenge,
    origin,
    rpID
  });
  await persistAuthStore();
  sendJson(response, 200, { ok: true, challengeId, options });
}

async function handlePasskeyAuthVerify(request, response) {
  const body = JSON.parse(await readRequestBody(request));
  if (!ensureApiAuth(request, response, { passcode: textSafe(body.passcode) })) {
    sendUnauthorized(response);
    return;
  }
  const challenge = takeChallenge(textSafe(body.challengeId), "passkey-authentication");
  if (!challenge) {
    sendJson(response, 400, { ok: false, message: "Passkey challenge expired." });
    return;
  }
  const credentialId = body.response?.id;
  const user = authStore.users.find((item) => item.passkeys.some((passkey) => passkey.id === credentialId));
  const passkey = user?.passkeys.find((item) => item.id === credentialId);
  if (!user || !passkey || (challenge.userId && challenge.userId !== user.id)) {
    sendJson(response, 404, { ok: false, message: "Passkey profile not found." });
    return;
  }
  const verification = await verifyAuthenticationResponse({
    response: body.response,
    expectedChallenge: challenge.challenge,
    expectedOrigin: challenge.origin,
    expectedRPID: challenge.rpID,
    credential: credentialForVerify(passkey),
    requireUserVerification: true
  });
  if (!verification.verified) {
    sendJson(response, 401, { ok: false, message: "Passkey sign-in failed." });
    return;
  }
  passkey.counter = verification.authenticationInfo.newCounter;
  passkey.lastUsedAt = new Date().toISOString();
  user.lastLoginAt = new Date().toISOString();
  await persistAuthStore();
  setProfileCookie(request, response, user);
  sendJson(response, 200, { ok: true, user: publicUser(user), message: "Signed in with passkey." });
}

function applyAction(action, actor = null) {
  const payload = action.payload || {};
  const next = clone(sharedState);
  const actorFamilyId = familySafe(actor?.familyId);

  if (action.type === "claimMeal") {
    const meal = next.meals.find((item) => item.id === payload.id);
    const owner = actorFamilyId || familySafe(payload.owner);
    if (!meal || !owner) return { changed: false, message: "Meal slot not found." };
    if (meal.owner && meal.owner !== owner) {
      return { changed: false, message: "That meal is already claimed." };
    }
    meal.owner = meal.owner === owner ? "" : owner;
    sharedState = next;
    return { changed: true, message: meal.owner ? "Meal claimed." : "Meal moved back to open." };
  }

  if (action.type === "toggleSupply") {
    const supply = next.supplies.find((item) => item.id === payload.id);
    const owner = actorFamilyId || familySafe(payload.owner);
    if (!supply || !owner) return { changed: false, message: "Supply item not found." };
    if (supply.owner && supply.owner !== owner) {
      return { changed: false, message: "That supply is already claimed." };
    }
    supply.owner = supply.owner === owner ? "" : owner;
    sharedState = next;
    return { changed: true, message: supply.owner ? "Supply claimed." : "Supply moved back to still needed." };
  }

  if (action.type === "voteActivity") {
    const id = textSafe(payload.id);
    const familyId = actorFamilyId || familySafe(payload.familyId);
    if (!activityIds.has(id)) return { changed: false, message: "Activity not found." };
    if (!familyId) return { changed: false, message: "Choose a family first." };
    next.activityVoters[id] = next.activityVoters[id] || {};
    if (next.activityVoters[id][familyId]) {
      delete next.activityVoters[id][familyId];
      if (!Object.keys(next.activityVoters[id]).length) delete next.activityVoters[id];
      sharedState = next;
      return { changed: true, message: "Vote removed." };
    }
    next.activityVoters[id][familyId] = true;
    sharedState = next;
    return { changed: true, message: "Vote added." };
  }

  if (action.type === "checkin") {
    const familyId = actorFamilyId || familySafe(payload.familyId);
    if (!familyId) return { changed: false, message: "Choose a family first." };
    next.familyChecks[familyId] = true;
    next.familyResponses[familyId] = {
      arrival: textSafe(payload.arrival),
      leaving: textSafe(payload.leaving),
      kidFood: textSafe(payload.kidFood),
      allergies: textSafe(payload.allergies),
      gear: Array.isArray(payload.gear) ? payload.gear.map((item) => textSafe(item)).filter(Boolean).slice(0, 12) : [],
      updatedAt: new Date().toISOString()
    };
    sharedState = next;
    return { changed: true, message: "Check-in saved." };
  }

  if (action.type === "toggleChecklist") {
    const id = textSafe(payload.id);
    if (!checklistIds.has(id)) return { changed: false, message: "Checklist item not found." };
    next.checklists[id] = Boolean(payload.checked);
    sharedState = next;
    return { changed: true, message: next.checklists[id] ? "Checklist item marked done." : "Checklist item reopened." };
  }

  if (action.type === "addMealIdea") {
    const idea = textSafe(payload.idea);
    if (!idea) return { changed: false, message: "Meal idea is empty." };
    const day = daySafe(payload.day);
    next.meals.push({
      id: `meal-${Date.now()}`,
      day,
      dayLabel: dayLabelFor(day),
      type: textSafe(payload.type, "Meal idea"),
      time: "Flexible",
      owner: "",
      idea,
      kids: textSafe(payload.kids, "Add kid backup"),
      cold: [],
      custom: true,
      createdBy: actorFamilyId,
      createdAt: new Date().toISOString()
    });
    sharedState = next;
    return { changed: true, message: "Meal idea added." };
  }

  if (action.type === "updateMealPlan") {
    const meal = next.meals.find((item) => item.id === payload.id);
    if (!meal) return { changed: false, message: "Meal not found." };
    const idea = textSafe(payload.idea);
    if (!idea) return { changed: false, message: "Meal idea is empty." };
    const day = daySafe(payload.day);
    meal.day = day;
    meal.dayLabel = dayLabelFor(day);
    meal.type = textSafe(payload.type, meal.type || "Meal");
    meal.idea = idea;
    meal.kids = textSafe(payload.kids, meal.kids || "");
    meal.updatedAt = new Date().toISOString();
    sharedState = next;
    return { changed: true, message: "Meal updated." };
  }

  if (action.type === "updateMealIdea") {
    const meal = next.meals.find((item) => item.id === payload.id);
    if (!meal || !isCustomMealId(meal.id)) return { changed: false, message: "Only added meal ideas can be edited." };
    if (!canManageCustomItem(meal, actorFamilyId)) return { changed: false, message: "Only the family that added or owns this meal can edit it." };
    const idea = textSafe(payload.idea);
    if (!idea) return { changed: false, message: "Meal idea is empty." };
    const day = daySafe(payload.day);
    meal.day = day;
    meal.dayLabel = dayLabelFor(day);
    meal.type = textSafe(payload.type, "Meal idea");
    meal.idea = idea;
    meal.kids = textSafe(payload.kids, "Add kid backup");
    meal.updatedAt = new Date().toISOString();
    sharedState = next;
    return { changed: true, message: "Meal idea updated." };
  }

  if (action.type === "deleteMealIdea") {
    const index = next.meals.findIndex((item) => item.id === payload.id);
    const meal = index >= 0 ? next.meals[index] : null;
    if (!meal || !isCustomMealId(meal.id)) return { changed: false, message: "Only added meal ideas can be deleted." };
    if (!canManageCustomItem(meal, actorFamilyId)) return { changed: false, message: "Only the family that added or owns this meal can delete it." };
    next.meals.splice(index, 1);
    sharedState = next;
    return { changed: true, message: "Meal idea deleted." };
  }

  if (action.type === "addSupply") {
    const name = textSafe(payload.name);
    if (!name) return { changed: false, message: "Supply item is empty." };
    next.supplies.push({
      id: `supply-${Date.now()}`,
      name,
      notes: textSafe(payload.notes),
      qty: textSafe(payload.notes),
      type: bringingTypeSafe(payload.type),
      owner: actorFamilyId,
      mealType: mealTypeSafe(payload.mealType),
      days: dayListSafe(payload.days),
      image: imageDataUrlSafe(payload.image),
      custom: true,
      createdBy: actorFamilyId,
      createdAt: new Date().toISOString()
    });
    sharedState = next;
    return { changed: true, message: "Bringing item added." };
  }

  if (action.type === "updateSupply") {
    const supply = next.supplies.find((item) => item.id === payload.id);
    if (!supply) return { changed: false, message: "Bringing item not found." };
    if (!canManageCustomItem(supply, actorFamilyId)) return { changed: false, message: "Only your family can edit this bringing item." };
    const name = textSafe(payload.name);
    if (!name) return { changed: false, message: "Bringing item is empty." };
    supply.name = name;
    supply.notes = textSafe(payload.notes);
    supply.qty = textSafe(payload.notes);
    supply.type = bringingTypeSafe(payload.type || supply.type);
    supply.mealType = mealTypeSafe(payload.mealType || supply.mealType);
    supply.days = dayListSafe(payload.days, supply.days);
    supply.image = imageDataUrlSafe(payload.image);
    supply.updatedAt = new Date().toISOString();
    sharedState = next;
    return { changed: true, message: "Bringing item updated." };
  }

  if (action.type === "deleteSupply") {
    const index = next.supplies.findIndex((item) => item.id === payload.id);
    const supply = index >= 0 ? next.supplies[index] : null;
    if (!supply) return { changed: false, message: "Bringing item not found." };
    if (!canManageCustomItem(supply, actorFamilyId)) return { changed: false, message: "Only your family can delete this bringing item." };
    next.supplies.splice(index, 1);
    sharedState = next;
    return { changed: true, message: "Bringing item deleted." };
  }

  if (action.type === "reset") {
    sharedState = normalizeState(action.seed || {});
    return { changed: true, message: "Trip board reset." };
  }

  return { changed: false, message: "Unknown action." };
}

async function handleAction(request, response, passcode, actor) {
  try {
    const body = JSON.parse(await readRequestBody(request));
    if (body.type === "reset" && !ensureApiAuth(request, response, { admin: true, passcode })) {
      return sendJson(response, 401, { changed: false, message: "Unauthorized reset.", state: sharedState });
    }

    if (body.type === "reset") {
      const seed = await loadSeedState();
      body.seed = seed || {};
    }
    const result = applyAction(body, actor);
    if (result.changed) {
      touchState();
      await persistState();
      broadcastState();
    }
    sendJson(response, result.changed ? 200 : 409, { ...result, ...sharedStatePayload() });
  } catch (error) {
    sendJson(response, 400, { changed: false, message: error.message || "Bad request.", state: sharedState });
  }
}

function handleEvents(request, response) {
  response.writeHead(200, {
    "content-type": "text/event-stream; charset=utf-8",
    "cache-control": "no-cache, no-transform",
    connection: "keep-alive",
    "x-accel-buffering": "no"
  });
  response.write("retry: 4000\n");
  response.write(`event: state\ndata: ${JSON.stringify(sharedState)}\n\n`);
  response.write(": connected\n\n");
  clients.add(response);
  request.on("close", () => clients.delete(response));
}

// Keep SSE connections alive through idle proxies and iOS background tabs.
// Without a periodic comment frame, connections can sit half-open and the
// board shows stale data until the next action forces a reconnect.
const heartbeat = setInterval(() => {
  for (const response of clients) {
    try {
      response.write(": ping\n\n");
    } catch {
      clients.delete(response);
    }
  }
}, 25000);
heartbeat.unref();

function safeStaticPath(pathname) {
  const decoded = decodeURIComponent(pathname);
  const requested = decoded === "/" ? "/index.html" : decoded;
  const candidate = normalize(join(rootDir, requested));
  const rel = relative(rootDir, candidate);
  if (rel.startsWith("..") || rel.includes("..")) return null;
  return candidate;
}

function isPublicStaticPath(pathname) {
  if (pathname === "/") return true;
  if (["/index.html", "/styles.css", "/script.js", "/app-config.js", "/service-worker.js", "/manifest.webmanifest"].includes(pathname)) return true;
  if (pathname.startsWith("/assets/")) return true;
  return false;
}

async function serveStatic(request, response, pathname) {
  if (!isPublicStaticPath(pathname)) {
    sendNotFound(response);
    return;
  }
  const filePath = safeStaticPath(pathname);
  if (!filePath || !existsSync(filePath)) {
    sendNotFound(response);
    return;
  }
  const ext = extname(filePath).toLowerCase();
  response.writeHead(200, {
    "content-type": mimeTypes[ext] || "application/octet-stream",
    "cache-control": ext === ".html" ? "no-cache" : "public, max-age=3600"
  });
  createReadStream(filePath).pipe(response);
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);
  const providedPasscode = getProvidedPasscode(request, url);
  const isWriteMethod = ["POST", "PUT", "PATCH", "DELETE"].includes(request.method || "");

  if (isWriteMethod && !isAllowedRequestOrigin(request)) {
    sendJson(response, 403, { ok: false, message: "Origin not allowed." });
    return;
  }

  if (request.method === "GET" && url.pathname === "/api/health") {
    sendJson(response, 200, {
      ok: true,
      name: "Cabin Bring Board",
      version: sharedState.version,
      updatedAt: sharedState.updatedAt
    });
    return;
  }

  // Public, subscribable calendar feed (no auth) for Apple/Google Calendar.
  if ((request.method === "GET" || request.method === "HEAD") &&
      (url.pathname === "/trip.ics" || url.pathname === "/calendar.ics")) {
    const ics = buildICS(sharedState, privateTripInfo);
    response.writeHead(200, {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'inline; filename="guantones-trip.ics"',
      "Cache-Control": "public, max-age=900",
      "Access-Control-Allow-Origin": "*"
    });
    response.end(request.method === "HEAD" ? undefined : ics);
    return;
  }

  if (request.method === "GET" && url.pathname === "/api/me") {
    await handleMe(request, response, providedPasscode);
    return;
  }

  if (request.method === "POST" && url.pathname === "/api/auth/continue") {
    try {
      await handleProfileContinue(request, response);
    } catch (error) {
      sendJson(response, 400, { ok: false, message: error.message || "Profile request failed." });
    }
    return;
  }

  if (request.method === "POST" && url.pathname === "/api/auth/login") {
    try {
      await handlePasswordLogin(request, response);
    } catch (error) {
      sendJson(response, 400, { ok: false, message: error.message || "Sign-in failed." });
    }
    return;
  }

  if (request.method === "POST" && url.pathname === "/api/auth/logout") {
    await handleLogout(request, response);
    return;
  }

  if (request.method === "POST" && url.pathname === "/api/passkey/register/options") {
    try {
      await handlePasskeyRegisterOptions(request, response, providedPasscode);
    } catch (error) {
      sendJson(response, 400, { ok: false, message: error.message || "Could not start passkey setup." });
    }
    return;
  }

  if (request.method === "POST" && url.pathname === "/api/passkey/register/verify") {
    try {
      await handlePasskeyRegisterVerify(request, response);
    } catch (error) {
      sendJson(response, 400, { ok: false, message: error.message || "Could not verify passkey." });
    }
    return;
  }

  if (request.method === "POST" && url.pathname === "/api/passkey/auth/options") {
    try {
      await handlePasskeyAuthOptions(request, response);
    } catch (error) {
      sendJson(response, 400, { ok: false, message: error.message || "Could not start passkey sign-in." });
    }
    return;
  }

  if (request.method === "POST" && url.pathname === "/api/passkey/auth/verify") {
    try {
      await handlePasskeyAuthVerify(request, response);
    } catch (error) {
      sendJson(response, 400, { ok: false, message: error.message || "Could not verify passkey sign-in." });
    }
    return;
  }

  if (request.method === "GET" && url.pathname === "/api/state") {
    if (!ensureApiAuth(request, response, { passcode: providedPasscode })) {
      sendUnauthorized(response);
      return;
    }
    if (!requireProfile(request, response)) return;
    sendJson(response, 200, sharedStatePayload());
    return;
  }

  if (request.method === "POST" && url.pathname === "/api/action") {
    if (!ensureApiAuth(request, response, { passcode: providedPasscode })) {
      sendUnauthorized(response);
      return;
    }
    const actor = requireProfile(request, response);
    if (!actor) return;
    await handleAction(request, response, providedPasscode, actor);
    return;
  }

  if (request.method === "GET" && url.pathname === "/api/events") {
    if (!ensureApiAuth(request, response, { passcode: providedPasscode })) {
      sendUnauthorized(response);
      return;
    }
    if (!requireProfile(request, response)) return;
    handleEvents(request, response);
    return;
  }

  if (request.method === "GET" || request.method === "HEAD") {
    await serveStatic(request, response, url.pathname);
    return;
  }

  response.writeHead(405, { "content-type": "text/plain; charset=utf-8" });
  response.end("Method not allowed");
});

server.listen(port, "0.0.0.0", () => {
  const urls = [`http://localhost:${port}`];
  for (const address of localAddresses()) {
    urls.push(`http://${address}:${port}`);
  }
console.log("Cabin Bring Board is running:");
  for (const url of urls) console.log(`  ${url}`);
});

function localAddresses() {
  const addresses = [];
  for (const items of Object.values(networkInterfaces())) {
    for (const item of items || []) {
      if (item.family === "IPv4" && !item.internal) {
        addresses.push(item.address);
      }
    }
  }
  return addresses;
}
