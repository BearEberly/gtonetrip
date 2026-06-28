import { createServer } from "node:http";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { existsSync, createReadStream } from "node:fs";
import { extname, join, normalize, relative, resolve } from "node:path";
import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { networkInterfaces } from "node:os";

const rootDir = resolve(".");
const dataDir = resolve(process.env.DATA_DIR || join(rootDir, "data"));
const bundledSeedPath = join(rootDir, "data", "seed-state.json");
const seedPath = existsSync(dataDir) ? join(dataDir, "seed-state.json") : bundledSeedPath;
const statePath = join(dataDir, "cabin-state.json");
const port = Number(process.env.PORT || 8000);
const clients = new Set();

const APP_PASSCODE = (process.env.APP_PASSCODE || "").trim();
const APP_ADMIN_PASSCODE = (process.env.APP_ADMIN_PASSCODE || APP_PASSCODE).trim();
const SESSION_SECRET = (process.env.SESSION_SECRET || randomBytes(24).toString("hex")).trim();
const AUTH_HEADER = "x-cabin-passcode";
const AUTH_COOKIE_NAME = "cabin_trip_auth";
const AUTH_COOKIE_TTL = Number(process.env.AUTH_COOKIE_TTL || 60 * 60 * 24 * 30);

const AUTH_TOKEN = APP_PASSCODE ? `v1.${createAuthSignature(APP_PASSCODE)}` : "";
const ADMIN_AUTH_TOKEN = APP_ADMIN_PASSCODE ? `v1.${createAuthSignature(APP_ADMIN_PASSCODE)}` : AUTH_TOKEN;

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
let writeQueue = Promise.resolve();

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

function normalizeState(state) {
  return {
    version: Number(state.version || 1),
    updatedAt: state.updatedAt || new Date().toISOString(),
    meals: Array.isArray(state.meals) ? state.meals : [],
    supplies: Array.isArray(state.supplies) ? state.supplies : [],
    familyChecks: state.familyChecks && typeof state.familyChecks === "object" ? state.familyChecks : {},
    familyResponses: state.familyResponses && typeof state.familyResponses === "object" ? state.familyResponses : {},
    activityVotes: state.activityVotes && typeof state.activityVotes === "object" ? state.activityVotes : {}
  };
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function persistState() {
  const payload = JSON.stringify(sharedState, null, 2);
  writeQueue = writeQueue.then(() => writeFile(statePath, `${payload}\n`));
  return writeQueue;
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
    needsPasscode: true,
    state: sharedState
  });
}

function readRequestBody(request, maxBytes = 64 * 1024) {
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

function textSafe(value, fallback = "") {
  return String(value || fallback).trim().slice(0, 180);
}

function daySafe(value) {
  return ["fri", "sat", "sun", "mon"].includes(value) ? value : "sun";
}

function dayLabelFor(day) {
  return {
    fri: "Fri Jul 3",
    sat: "Sat Jul 4",
    sun: "Sun Jul 5",
    mon: "Mon Jul 6"
  }[daySafe(day)];
}

function supplyTypeSafe(value) {
  return ["dry goods", "cold", "gear"].includes(value) ? value : "dry goods";
}

const VALID_ACTIVITY_IDS = new Set([
  "white-pines",
  "big-trees",
  "logging",
  "lake-alpine",
  "big-trees-market",
  "bear-valley"
]);

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

function setAuthCookie(response, token) {
  response.setHeader(
    "set-cookie",
    `${AUTH_COOKIE_NAME}=${token}; Path=/; Max-Age=${AUTH_COOKIE_TTL}; HttpOnly; SameSite=Strict`
  );
}

function hasAuthForPasscode(request, token) {
  return isTokenMatch(parseCookie(request.headers.cookie || "", AUTH_COOKIE_NAME), token);
}

function ensureApiAuth(request, response, options = {}) {
  if (!APP_PASSCODE) return true;

  const passcode = options.passcode || "";
  if (passcode) {
    if (passcode === APP_ADMIN_PASSCODE) {
      setAuthCookie(response, ADMIN_AUTH_TOKEN);
      return true;
    }
    if (passcode === APP_PASSCODE) {
      setAuthCookie(response, AUTH_TOKEN);
      return true;
    }
  }

  const token = parseCookie(request.headers.cookie || "", AUTH_COOKIE_NAME);
  if (hasAuthForPasscode(request, ADMIN_AUTH_TOKEN)) return true;
  if (!options.admin && hasAuthForPasscode(request, AUTH_TOKEN)) return true;

  return false;
}

function applyAction(action) {
  const payload = action.payload || {};
  const next = clone(sharedState);

  if (action.type === "claimMeal") {
    const meal = next.meals.find((item) => item.id === payload.id);
    const owner = familySafe(payload.owner);
    if (!meal || !owner) return { changed: false, message: "Meal slot not found." };
    if (meal.owner && meal.owner !== owner) {
      return { changed: false, message: "That meal is already claimed." };
    }
    // Toggle: claiming an open meal sets the owner; tapping your own releases it.
    meal.owner = meal.owner === owner ? "" : owner;
    sharedState = next;
    return { changed: true, message: meal.owner ? "Meal claimed." : "Meal opened back up." };
  }

  if (action.type === "toggleSupply") {
    const supply = next.supplies.find((item) => item.id === payload.id);
    const owner = familySafe(payload.owner);
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
    if (!id || !VALID_ACTIVITY_IDS.has(id)) return { changed: false, message: "Activity not found." };
    next.activityVotes[id] = Number(next.activityVotes[id] || 0) + 1;
    sharedState = next;
    return { changed: true, message: "Vote added." };
  }

  if (action.type === "checkin") {
    const familyId = familySafe(payload.familyId);
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
      cold: []
    });
    sharedState = next;
    return { changed: true, message: "Meal idea added." };
  }

  if (action.type === "addSupply") {
    const name = textSafe(payload.name);
    if (!name) return { changed: false, message: "Supply item is empty." };
    next.supplies.push({
      id: `supply-${Date.now()}`,
      name,
      qty: textSafe(payload.qty, "Quantity TBD"),
      type: supplyTypeSafe(payload.type),
      owner: ""
    });
    sharedState = next;
    return { changed: true, message: "Supply added." };
  }

  if (action.type === "reset") {
    sharedState = normalizeState(action.seed || {});
    return { changed: true, message: "Trip board reset." };
  }

  return { changed: false, message: "Unknown action." };
}

async function handleAction(request, response, passcode) {
  try {
    const body = JSON.parse(await readRequestBody(request));
    if (body.type === "reset" && !ensureApiAuth(request, response, { admin: true, passcode })) {
      return sendJson(response, 401, { changed: false, message: "Unauthorized reset.", state: sharedState });
    }

    if (body.type === "reset") {
      const seed = await loadSeedState();
      body.seed = seed || {};
    }
    const result = applyAction(body);
    if (result.changed) {
      touchState();
      await persistState();
      broadcastState();
    }
    sendJson(response, result.changed ? 200 : 409, { ...result, state: sharedState });
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

async function serveStatic(request, response, pathname) {
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

  if (request.method === "GET" && url.pathname === "/api/state") {
    if (!ensureApiAuth(request, response, { passcode: providedPasscode })) {
      sendUnauthorized(response);
      return;
    }
    sendJson(response, 200, { state: sharedState });
    return;
  }

  if (request.method === "POST" && url.pathname === "/api/action") {
    if (!ensureApiAuth(request, response, { passcode: providedPasscode })) {
      sendUnauthorized(response);
      return;
    }
    await handleAction(request, response, providedPasscode);
    return;
  }

  if (request.method === "GET" && url.pathname === "/api/events") {
    if (!ensureApiAuth(request, response, { passcode: providedPasscode })) {
      sendUnauthorized(response);
      return;
    }
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
  console.log("Cabin Game Plan is running:");
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
