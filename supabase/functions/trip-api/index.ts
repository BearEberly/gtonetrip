import { createClient } from "npm:@supabase/supabase-js@2";
import {
  generateAuthenticationOptions,
  generateRegistrationOptions,
  verifyAuthenticationResponse,
  verifyRegistrationResponse
} from "npm:@simplewebauthn/server@13.3.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
};

const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const client = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false }
});

const SHARED_LOGIN_PASSWORD = "1333";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30;
const PASSKEY_CHALLENGE_TTL_MS = 1000 * 60 * 10;
const PASSKEY_RP_NAME = "4th of July 2026";
const tripInfo = Object.freeze({
  address: "1018 Wawona Way, Arnold, CA 95223",
  neighborhood: "Sequoia Woods",
  propertySummary: "4 bed / 3 bath · about 2,430 sq ft · wooded half-acre lot",
  cityLabel: "Arnold, California",
  checkout: "Monday July 6 · time TBD",
  doorCode: "TBD",
  wifi: "TBD"
});

const attendeeCatalog = new Map([
  ["shell", { personId: "shell", firstName: "Shell", familyId: "shell" }],
  ["nick", { personId: "nick", firstName: "Nick", familyId: "nick" }],
  ["marissa", { personId: "marissa", firstName: "Marissa", familyId: "nick" }],
  ["bear", { personId: "bear", firstName: "Bear", familyId: "bear" }],
  ["jessica", { personId: "jessica", firstName: "Jessica", familyId: "bear" }],
  ["andy", { personId: "andy", firstName: "Andy", familyId: "nat" }],
  ["natalie", { personId: "natalie", firstName: "Natalie", familyId: "nat" }]
]);

const familyIds = new Set(["shell", "nick", "nat", "bear"]);
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
const allDayCodes = ["wed", "thu", "fri", "sat", "sun", "mon"];
const allowedPasskeyHosts = new Set([
  "localhost",
  "gtonetrip.beareberly.com",
  "gtonetrip.pages.dev"
]);

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" }
  });
}

function textSafe(value: unknown, fallback = "") {
  const text = String(value ?? "").trim();
  return text ? text.slice(0, 500) : fallback;
}

function personSafe(value: unknown) {
  const normalized = String(value || "").trim().toLowerCase();
  return attendeeCatalog.has(normalized) ? normalized : "";
}

function familySafe(value: unknown) {
  const normalized = String(value || "").trim().toLowerCase();
  return familyIds.has(normalized) ? normalized : "";
}

function userFromFirstName(firstName: unknown) {
  const normalized = String(firstName || "").trim().toLowerCase();
  return attendeeCatalog.get(normalized) || null;
}

function userFromPersonId(personId: unknown) {
  const normalized = String(personId || "").trim().toLowerCase();
  return attendeeCatalog.get(normalized) || null;
}

function daySafe(value: unknown) {
  const normalized = String(value || "").trim().toLowerCase();
  return allDayCodes.includes(normalized) ? normalized : "sun";
}

function dayLabelFor(day: string) {
  return {
    wed: "Wed Jul 1",
    thu: "Thu Jul 2",
    fri: "Fri Jul 3",
    sat: "Sat Jul 4",
    sun: "Sun Jul 5",
    mon: "Mon Jul 6"
  }[day] || "Sun Jul 5";
}

function mealTypeSafe(value: unknown) {
  const normalized = String(value || "").trim().toLowerCase();
  return ["breakfast", "lunch", "dinner", "dessert", "pack-up", "any"].includes(normalized) ? normalized : "any";
}

function bringingTypeSafe(value: unknown) {
  const normalized = String(value || "").trim().toLowerCase();
  if (["food", "drink", "gear", "table"].includes(normalized)) return normalized;
  if (normalized === "cold") return "food";
  if (normalized === "dry goods") return "table";
  return "food";
}

function dayListSafe(value: unknown, fallback: string[] = []) {
  const list = Array.isArray(value) ? value : fallback;
  return allDayCodes.filter((day) => list.includes(day));
}

function imageDataUrlSafe(value: unknown) {
  const raw = String(value || "").trim();
  if (!raw.startsWith("data:image/")) return "";
  return raw.length <= 400000 ? raw : "";
}

function base64UrlFromBytes(value: Uint8Array) {
  let binary = "";
  for (const byte of value) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

function bytesFromBase64Url(value: string) {
  const normalized = String(value || "").replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(normalized.length + ((4 - normalized.length % 4) % 4), "=");
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function passkeyOriginInfo(request: Request) {
  const rawOrigin = String(request.headers.get("origin") || "").trim();
  if (!rawOrigin) throw new Error("Passkeys require a browser origin.");
  const parsed = new URL(rawOrigin);
  const host = parsed.hostname.toLowerCase();
  if (!allowedPasskeyHosts.has(host)) throw new Error("Passkeys are only available on the trip site.");
  if (host === "localhost") {
    if (!["http:", "https:"].includes(parsed.protocol)) throw new Error("Local passkeys require localhost.");
  } else if (parsed.protocol !== "https:") {
    throw new Error("Passkeys require HTTPS on the live site.");
  }
  return {
    origin: `${parsed.protocol}//${parsed.host}`,
    rpID: host
  };
}

function parseTransportList(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.map((item) => String(item || "").trim()).filter(Boolean);
}

function passkeyUserId(personId: string) {
  return new TextEncoder().encode(personId);
}

function isCustomMealId(id: string) {
  return String(id || "").startsWith("meal-");
}

function canManageCustomItem(item: Record<string, unknown>, actorFamilyId: string) {
  const familyId = familySafe(actorFamilyId);
  if (!item || !familyId) return false;
  const createdBy = familySafe(item.createdBy);
  const owner = familySafe(item.owner);
  if (createdBy) return createdBy === familyId || owner === familyId;
  return !owner || owner === familyId;
}

function normalizeActivityVoters(value: unknown) {
  const next: Record<string, Record<string, boolean>> = {};
  if (!value || typeof value !== "object") return next;
  for (const id of activityIds) {
    const raw = (value as Record<string, unknown>)[id];
    if (!raw || typeof raw !== "object") continue;
    const voters: Record<string, boolean> = {};
    for (const familyId of Object.keys(raw as Record<string, unknown>)) {
      const safeId = familySafe(familyId);
      if (safeId && (raw as Record<string, unknown>)[familyId]) voters[safeId] = true;
    }
    if (Object.keys(voters).length) next[id] = voters;
  }
  return next;
}

function normalizeChecklists(value: unknown) {
  const next: Record<string, boolean> = {};
  if (!value || typeof value !== "object") return next;
  for (const id of checklistIds) {
    if (Object.hasOwn(value as Record<string, unknown>, id)) next[id] = Boolean((value as Record<string, unknown>)[id]);
  }
  return next;
}

function normalizeState(state: Record<string, unknown>) {
  return {
    version: Number(state.version || 1),
    updatedAt: state.updatedAt || new Date().toISOString(),
    meals: Array.isArray(state.meals) ? state.meals : [],
    supplies: Array.isArray(state.supplies) ? state.supplies : [],
    familyChecks: state.familyChecks && typeof state.familyChecks === "object" ? state.familyChecks : {},
    familyResponses: state.familyResponses && typeof state.familyResponses === "object" ? state.familyResponses : {},
    activityVotes: state.activityVotes && typeof state.activityVotes === "object" ? state.activityVotes : {},
    activityVoters: normalizeActivityVoters(state.activityVoters),
    checklists: normalizeChecklists(state.checklists)
  };
}

async function getStoredState() {
  const { data, error } = await client.from("trip_state").select("state").eq("key", "primary").single();
  if (error) throw error;
  return normalizeState((data?.state as Record<string, unknown>) || {});
}

async function saveStoredState(state: Record<string, unknown>) {
  const next = {
    ...state,
    version: Number(state.version || 1) + 1,
    updatedAt: new Date().toISOString()
  };
  const { error } = await client.from("trip_state").update({
    state: next,
    updated_at: new Date().toISOString()
  }).eq("key", "primary");
  if (error) throw error;
  return next;
}

async function createSession(user: { personId: string; firstName: string; familyId: string }) {
  const token = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS).toISOString();
  const { error } = await client.from("app_sessions").upsert({
    token,
    person_id: user.personId,
    first_name: user.firstName,
    family_id: user.familyId,
    expires_at: expiresAt
  });
  if (error) throw error;
  return { token, expiresAt };
}

async function deleteSession(token: string) {
  if (!token) return;
  await client.from("app_sessions").delete().eq("token", token);
}

async function currentSession(request: Request) {
  const auth = request.headers.get("authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7).trim() : "";
  if (!token) return null;
  const { data, error } = await client.from("app_sessions")
    .select("token, person_id, first_name, family_id, expires_at")
    .eq("token", token)
    .single();
  if (error || !data) return null;
  if (new Date(data.expires_at).getTime() < Date.now()) {
    await deleteSession(token);
    return null;
  }
  return {
    token,
    user: {
      personId: data.person_id,
      firstName: data.first_name,
      familyId: data.family_id
    }
  };
}

async function cleanupExpiredPasskeyChallenges() {
  await client.from("passkey_challenges").delete().lt("expires_at", new Date().toISOString());
}

async function savePasskeyChallenge(input: {
  challenge: string;
  flow: "register" | "authenticate";
  personId?: string;
  familyId?: string;
  rpID: string;
  origin: string;
}) {
  const expiresAt = new Date(Date.now() + PASSKEY_CHALLENGE_TTL_MS).toISOString();
  const { error } = await client.from("passkey_challenges").upsert({
    challenge: input.challenge,
    flow: input.flow,
    person_id: input.personId || null,
    family_id: input.familyId || null,
    rp_id: input.rpID,
    origin: input.origin,
    expires_at: expiresAt
  });
  if (error) throw error;
  return expiresAt;
}

async function getPasskeyChallenge(challenge: string, flow: "register" | "authenticate") {
  const { data, error } = await client.from("passkey_challenges")
    .select("challenge, flow, person_id, family_id, rp_id, origin, expires_at")
    .eq("challenge", challenge)
    .eq("flow", flow)
    .single();
  if (error || !data) return null;
  if (new Date(data.expires_at).getTime() < Date.now()) {
    await client.from("passkey_challenges").delete().eq("challenge", challenge);
    return null;
  }
  return data;
}

async function deletePasskeyChallenge(challenge: string) {
  await client.from("passkey_challenges").delete().eq("challenge", challenge);
}

async function listPasskeysForPerson(personId: string, rpID: string) {
  const { data, error } = await client.from("passkey_credentials")
    .select("credential_id, public_key, counter, transports, device_type, backed_up")
    .eq("person_id", personId)
    .eq("rp_id", rpID)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data || [];
}

async function countPasskeysForRp(rpID: string) {
  const { count, error } = await client.from("passkey_credentials")
    .select("credential_id", { count: "exact", head: true })
    .eq("rp_id", rpID);
  if (error) throw error;
  return Number(count || 0);
}

async function getPasskeyCredential(credentialId: string, rpID: string) {
  const { data, error } = await client.from("passkey_credentials")
    .select("credential_id, person_id, family_id, public_key, counter, transports, device_type, backed_up")
    .eq("credential_id", credentialId)
    .eq("rp_id", rpID)
    .single();
  if (error || !data) return null;
  return data;
}

async function upsertPasskeyCredential(input: {
  credentialId: string;
  personId: string;
  familyId: string;
  rpID: string;
  publicKey: string;
  counter: number;
  transports: string[];
  deviceType: string;
  backedUp: boolean;
}) {
  const now = new Date().toISOString();
  const { error } = await client.from("passkey_credentials").upsert({
    credential_id: input.credentialId,
    person_id: input.personId,
    family_id: input.familyId,
    rp_id: input.rpID,
    public_key: input.publicKey,
    counter: input.counter,
    transports: input.transports,
    device_type: input.deviceType,
    backed_up: input.backedUp,
    updated_at: now,
    last_used_at: now
  });
  if (error) throw error;
}

async function touchPasskeyCredential(input: {
  credentialId: string;
  rpID: string;
  counter: number;
  deviceType: string;
  backedUp: boolean;
}) {
  const { error } = await client.from("passkey_credentials").update({
    counter: input.counter,
    device_type: input.deviceType,
    backed_up: input.backedUp,
    updated_at: new Date().toISOString(),
    last_used_at: new Date().toISOString()
  }).eq("credential_id", input.credentialId).eq("rp_id", input.rpID);
  if (error) throw error;
}

function applyAction(state: Record<string, unknown>, action: { type: string; payload?: Record<string, unknown> }, actorFamilyId: string) {
  const payload = action.payload || {};
  const next = structuredClone(state);

  if (action.type === "claimMeal") {
    const meal = (next.meals as Record<string, unknown>[]).find((item) => item.id === payload.id);
    const familyId = familySafe(actorFamilyId);
    if (!meal || !familyId) return { changed: false, message: "Choose a family first." };
    const owner = familySafe(meal.owner);
    if (owner && owner !== familyId) return { changed: false, message: "Meal already claimed." };
    meal.owner = owner ? "" : familyId;
    return { changed: true, message: owner ? "Meal moved back to open." : "Meal claimed.", state: next };
  }

  if (action.type === "toggleSupply") {
    const item = (next.supplies as Record<string, unknown>[]).find((supply) => supply.id === payload.id);
    const familyId = familySafe(actorFamilyId);
    if (!item || !familyId) return { changed: false, message: "Choose a family first." };
    const owner = familySafe(item.owner);
    if (owner && owner !== familyId) return { changed: false, message: "Item already claimed." };
    item.owner = owner ? "" : familyId;
    return { changed: true, message: owner ? "Supply moved back to still needed." : "Supply claimed.", state: next };
  }

  if (action.type === "voteActivity") {
    const id = textSafe(payload.id);
    const familyId = familySafe(actorFamilyId);
    if (!activityIds.has(id) || !familyId) return { changed: false, message: "Choose a family first." };
    next.activityVoters ||= {};
    next.activityVoters[id] ||= {};
    if (next.activityVoters[id][familyId]) {
      delete next.activityVoters[id][familyId];
      if (!Object.keys(next.activityVoters[id]).length) delete next.activityVoters[id];
      return { changed: true, message: "Vote removed.", state: next };
    }
    next.activityVoters[id][familyId] = true;
    return { changed: true, message: "Vote added.", state: next };
  }

  if (action.type === "toggleChecklist") {
    const id = textSafe(payload.id);
    if (!checklistIds.has(id)) return { changed: false, message: "Checklist item not found." };
    next.checklists ||= {};
    next.checklists[id] = Boolean(payload.checked);
    return { changed: true, message: next.checklists[id] ? "Checklist item marked done." : "Checklist item reopened.", state: next };
  }

  if (action.type === "checkin") {
    const familyId = familySafe(actorFamilyId || payload.familyId);
    if (!familyId) return { changed: false, message: "Choose a family first." };
    next.familyChecks ||= {};
    next.familyResponses ||= {};
    next.familyChecks[familyId] = true;
    next.familyResponses[familyId] = {
      arrival: textSafe(payload.arrival),
      leaving: textSafe(payload.leaving),
      kidFood: textSafe(payload.kidFood),
      allergies: textSafe(payload.allergies),
      gear: Array.isArray(payload.gear) ? payload.gear.map((item) => textSafe(item)).filter(Boolean).slice(0, 12) : [],
      updatedAt: new Date().toISOString()
    };
    return { changed: true, message: "Check-in saved.", state: next };
  }

  if (action.type === "addMealIdea") {
    const idea = textSafe(payload.idea);
    if (!idea) return { changed: false, message: "Meal idea is empty." };
    const day = daySafe(payload.day);
    (next.meals as Record<string, unknown>[]).push({
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
    return { changed: true, message: "Meal idea added.", state: next };
  }

  if (action.type === "updateMealIdea") {
    const meal = (next.meals as Record<string, unknown>[]).find((item) => item.id === payload.id);
    if (!meal || !isCustomMealId(String(meal.id || ""))) return { changed: false, message: "Only added meal ideas can be edited." };
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
    return { changed: true, message: "Meal idea updated.", state: next };
  }

  if (action.type === "deleteMealIdea") {
    const meals = next.meals as Record<string, unknown>[];
    const index = meals.findIndex((item) => item.id === payload.id);
    const meal = index >= 0 ? meals[index] : null;
    if (!meal || !isCustomMealId(String(meal.id || ""))) return { changed: false, message: "Only added meal ideas can be deleted." };
    if (!canManageCustomItem(meal, actorFamilyId)) return { changed: false, message: "Only the family that added or owns this meal can delete it." };
    meals.splice(index, 1);
    return { changed: true, message: "Meal idea deleted.", state: next };
  }

  if (action.type === "addSupply") {
    const name = textSafe(payload.name);
    if (!name) return { changed: false, message: "Bringing item is empty." };
    const supplyNotes = textSafe(payload.notes ?? payload.qty);
    (next.supplies as Record<string, unknown>[]).push({
      id: `supply-${Date.now()}`,
      name,
      notes: supplyNotes,
      qty: supplyNotes,
      type: bringingTypeSafe(payload.type),
      owner: actorFamilyId,
      mealType: mealTypeSafe(payload.mealType),
      days: dayListSafe(payload.days),
      image: imageDataUrlSafe(payload.image),
      custom: true,
      createdBy: actorFamilyId,
      createdAt: new Date().toISOString()
    });
    return { changed: true, message: "Bringing item added.", state: next };
  }

  if (action.type === "updateSupply") {
    const supply = (next.supplies as Record<string, unknown>[]).find((item) => item.id === payload.id);
    if (!supply) return { changed: false, message: "Bringing item not found." };
    if (!canManageCustomItem(supply, actorFamilyId)) return { changed: false, message: "Only your family can edit this bringing item." };
    const name = textSafe(payload.name);
    if (!name) return { changed: false, message: "Bringing item is empty." };
    const supplyNotes = textSafe(payload.notes ?? payload.qty);
    supply.name = name;
    supply.notes = supplyNotes;
    supply.qty = supplyNotes;
    supply.type = bringingTypeSafe(payload.type || supply.type);
    supply.mealType = mealTypeSafe(payload.mealType || supply.mealType);
    supply.days = dayListSafe(payload.days, Array.isArray(supply.days) ? (supply.days as string[]) : []);
    supply.image = imageDataUrlSafe(payload.image) || String(supply.image || "");
    supply.updatedAt = new Date().toISOString();
    return { changed: true, message: "Bringing item updated.", state: next };
  }

  if (action.type === "deleteSupply") {
    const supplies = next.supplies as Record<string, unknown>[];
    const index = supplies.findIndex((item) => item.id === payload.id);
    const supply = index >= 0 ? supplies[index] : null;
    if (!supply) return { changed: false, message: "Bringing item not found." };
    if (!canManageCustomItem(supply, actorFamilyId)) return { changed: false, message: "Only your family can delete this bringing item." };
    supplies.splice(index, 1);
    return { changed: true, message: "Bringing item deleted.", state: next };
  }

  return { changed: false, message: "Unknown action." };
}

// ---- Subscribable iCalendar (.ics) feed ----
const ICS_DAY_DATES: Record<string, [number, number, number]> = {
  wed: [2026, 7, 1], thu: [2026, 7, 2], fri: [2026, 7, 3],
  sat: [2026, 7, 4], sun: [2026, 7, 5], mon: [2026, 7, 6]
};
const ICS_MEAL_LABELS: Record<string, string> = {
  breakfast: "Breakfast", lunch: "Lunch", dinner: "Dinner", dessert: "Dessert / Snacks", "pack-up": "Pack-up"
};
const ICS_FAMILY_LABELS: Record<string, string> = { shell: "Shell", nick: "G6", bear: "Jear", nat: "Riggs" };
const ICS_DEFAULT_LOGISTICS: Record<string, { arrival: string }> = {
  shell: { arrival: "Wednesday afternoon" },
  nick: { arrival: "Thursday afternoon" },
  bear: { arrival: "Friday afternoon" },
  nat: { arrival: "Friday" }
};
const ICS_DAY_WORDS: Record<string, string> = { wednesday: "wed", thursday: "thu", friday: "fri", saturday: "sat", sunday: "sun", monday: "mon" };
const ICS_PDT_OFFSET = 7;

function icsMealTypeKey(type: unknown): string {
  const t = String(type || "").toLowerCase();
  if (t.includes("dessert")) return "dessert";
  if (t.includes("breakfast")) return "breakfast";
  if (t.includes("lunch")) return "lunch";
  if (t.includes("pack")) return "pack-up";
  if (t.includes("event")) return "event";
  return "dinner";
}
function icsPad(n: number) { return String(n).padStart(2, "0"); }
function icsParseRange(value: unknown): { sh: number; sm: number; eh: number; em: number } | null {
  const str = String(value || "").toLowerCase();
  const m = str.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?\s*(?:-|–|—|to)\s*(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/);
  const apply = (h: number, mer?: string) => {
    if (mer === "pm" && h < 12) return h + 12;
    if (mer === "am" && h === 12) return 0;
    return h;
  };
  if (!m) {
    const s = str.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)/);
    if (!s) return null;
    const h = apply(Number(s[1]), s[3]); const mm = Number(s[2] || 0);
    return { sh: h, sm: mm, eh: h + 1, em: mm };
  }
  const startMer = m[3]; const endMer = m[6] || m[3];
  return { sh: apply(Number(m[1]), startMer || endMer), sm: Number(m[2] || 0), eh: apply(Number(m[4]), endMer), em: Number(m[5] || 0) };
}
function icsUtc(date: [number, number, number], h: number, m: number) {
  const dt = new Date(Date.UTC(date[0], date[1] - 1, date[2], h + ICS_PDT_OFFSET, m, 0));
  return `${dt.getUTCFullYear()}${icsPad(dt.getUTCMonth() + 1)}${icsPad(dt.getUTCDate())}T${icsPad(dt.getUTCHours())}${icsPad(dt.getUTCMinutes())}00Z`;
}
function icsDate(date: [number, number, number]) { return `${date[0]}${icsPad(date[1])}${icsPad(date[2])}`; }
function icsNextDate(date: [number, number, number]): [number, number, number] {
  const dt = new Date(Date.UTC(date[0], date[1] - 1, date[2] + 1));
  return [dt.getUTCFullYear(), dt.getUTCMonth() + 1, dt.getUTCDate()];
}
function icsEsc(v: unknown) {
  return String(v || "").replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");
}
function icsFold(line: string) {
  if (line.length <= 73) return line;
  const out = [line.slice(0, 73)]; let s = line.slice(73);
  while (s.length > 72) { out.push(" " + s.slice(0, 72)); s = s.slice(72); }
  if (s.length) out.push(" " + s);
  return out.join("\r\n");
}
function icsArrivalForFamily(state: Record<string, any>, familyId: string): string {
  const responses = (state.familyResponses && typeof state.familyResponses === "object") ? state.familyResponses : {};
  const savedArrival = String(responses[familyId]?.arrival || "").trim();
  if (savedArrival) return savedArrival;
  return String(ICS_DEFAULT_LOGISTICS[familyId]?.arrival || "").trim();
}
function buildICS(state: Record<string, any>, info: Record<string, any>): string {
  const meals = Array.isArray(state.meals) ? state.meals : [];
  const supplies = Array.isArray(state.supplies) ? state.supplies : [];
  const location = info.address || "Arnold, California";
  const d = new Date();
  const stamp = `${d.getUTCFullYear()}${icsPad(d.getUTCMonth() + 1)}${icsPad(d.getUTCDate())}T${icsPad(d.getUTCHours())}${icsPad(d.getUTCMinutes())}${icsPad(d.getUTCSeconds())}Z`;
  const lines: string[] = [];
  const push = (l: string) => lines.push(icsFold(l));
  push("BEGIN:VCALENDAR");
  push("VERSION:2.0");
  push("PRODID:-//Guantones Trip//4th of July 2026//EN");
  push("CALSCALE:GREGORIAN");
  push("METHOD:PUBLISH");
  push("X-WR-CALNAME:4th of July 2026 — Guantones Trip");
  push("X-WR-TIMEZONE:America/Los_Angeles");
  push("REFRESH-INTERVAL;VALUE=DURATION:PT1H");
  push("X-PUBLISHED-TTL:PT1H");
  const add = (uid: string, summary: string, description: string, day: string, range: any) => {
    const date = ICS_DAY_DATES[day];
    if (!date) return;
    push("BEGIN:VEVENT");
    push(`UID:${icsEsc(uid)}@gtonetrip`);
    push(`DTSTAMP:${stamp}`);
    if (range) { push(`DTSTART:${icsUtc(date, range.sh, range.sm)}`); push(`DTEND:${icsUtc(date, range.eh, range.em)}`); }
    else { push(`DTSTART;VALUE=DATE:${icsDate(date)}`); push(`DTEND;VALUE=DATE:${icsDate(icsNextDate(date))}`); }
    push(`SUMMARY:${icsEsc(summary)}`);
    if (description) push(`DESCRIPTION:${icsEsc(description)}`);
    if (location) push(`LOCATION:${icsEsc(location)}`);
    push("END:VEVENT");
  };
  for (const famId of Object.keys(ICS_FAMILY_LABELS)) {
    const arrival = icsArrivalForFamily(state, famId);
    const text = String(arrival || "").toLowerCase();
    const word = Object.keys(ICS_DAY_WORDS).find((w) => text.includes(w));
    if (word) add(`arrival-${famId}`, `${ICS_FAMILY_LABELS[famId]} arrival`, String(arrival), ICS_DAY_WORDS[word], null);
  }
  for (const meal of meals) {
    const key = icsMealTypeKey(meal.type);
    if (key === "event") { add(`event-${meal.id}`, meal.idea || "Trip event", meal.kids || meal.time || "", meal.day, icsParseRange(meal.kids) || icsParseRange(meal.time)); continue; }
    if (!meal.idea) continue;
    const bringing = supplies
      .filter((it: any) => String(it.type || "").toLowerCase() === "food" && (it.owner || it.createdBy))
      .filter((it: any) => !it.days || !it.days.length || it.days.includes(meal.day))
      .filter((it: any) => it.mealType === "any" || it.mealType === key)
      .map((it: any) => it.name).filter(Boolean);
    const desc: string[] = [];
    if (meal.kids) desc.push(`Kid backup: ${meal.kids}`);
    if (bringing.length) desc.push(`Bringing: ${bringing.join(", ")}`);
    add(`meal-${meal.id}`, `${ICS_MEAL_LABELS[key] || "Meal"}: ${meal.idea}`, desc.join("\n"), meal.day, icsParseRange(meal.time));
  }
  push("END:VCALENDAR");
  return lines.join("\r\n") + "\r\n";
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const url = new URL(request.url);
  const route = url.pathname.split("/trip-api").pop() || "/";

  try {
    if (route === "/login" && request.method === "POST") {
      const body = await request.json();
      const user = userFromFirstName(body.firstName);
      if (!user) return json({ ok: false, message: "Enter your first name." }, 400);
      if (String(body.password || "") !== SHARED_LOGIN_PASSWORD) {
        return json({ ok: false, message: "Password did not match." }, 401);
      }
      const session = await createSession(user);
      return json({ ok: true, token: session.token, user, tripInfo, message: "Signed in." });
    }

    if (route === "/logout" && request.method === "POST") {
      const session = await currentSession(request);
      if (session?.token) await deleteSession(session.token);
      return json({ ok: true, user: null, message: "Signed out." });
    }

    if (route === "/passkey/auth/options" && request.method === "POST") {
      await cleanupExpiredPasskeyChallenges();
      const { origin, rpID } = passkeyOriginInfo(request);
      const options = await generateAuthenticationOptions({
        rpID,
        userVerification: "required"
      });
      await savePasskeyChallenge({
        challenge: options.challenge,
        flow: "authenticate",
        rpID,
        origin
      });
      const availableCount = await countPasskeysForRp(rpID);
      return json({ ok: true, options, availableCount });
    }

    if (route === "/passkey/auth/verify" && request.method === "POST") {
      await cleanupExpiredPasskeyChallenges();
      const body = await request.json();
      const challenge = textSafe(body.challenge);
      if (!challenge) return json({ ok: false, message: "Passkey challenge missing." }, 400);
      const challengeRow = await getPasskeyChallenge(challenge, "authenticate");
      if (!challengeRow) return json({ ok: false, message: "Passkey sign-in expired. Try again." }, 400);
      const credentialId = textSafe(body.response?.id);
      const credentialRow = await getPasskeyCredential(credentialId, challengeRow.rp_id);
      if (!credentialRow) {
        await deletePasskeyChallenge(challenge);
        return json({ ok: false, message: "That passkey is not saved for this trip yet." }, 404);
      }
      const verification = await verifyAuthenticationResponse({
        response: body.response,
        expectedChallenge: challengeRow.challenge,
        expectedOrigin: challengeRow.origin,
        expectedRPID: challengeRow.rp_id,
        credential: {
          id: credentialRow.credential_id,
          publicKey: bytesFromBase64Url(String(credentialRow.public_key || "")),
          counter: Number(credentialRow.counter || 0),
          transports: parseTransportList(credentialRow.transports)
        }
      });
      if (!verification.verified) {
        await deletePasskeyChallenge(challenge);
        return json({ ok: false, message: "Passkey sign-in could not be verified." }, 400);
      }
      const user = userFromPersonId(credentialRow.person_id);
      if (!user) {
        await deletePasskeyChallenge(challenge);
        return json({ ok: false, message: "That saved passkey is no longer linked to a trip login." }, 400);
      }
      await touchPasskeyCredential({
        credentialId: credentialRow.credential_id,
        rpID: challengeRow.rp_id,
        counter: Number(verification.authenticationInfo.newCounter || 0),
        deviceType: verification.authenticationInfo.credentialDeviceType,
        backedUp: Boolean(verification.authenticationInfo.credentialBackedUp)
      });
      await deletePasskeyChallenge(challenge);
      const session = await createSession(user);
      return json({ ok: true, token: session.token, user, tripInfo, message: "Signed in with passkey." });
    }

    // Public, subscribable calendar feed (no auth) for Apple/Google Calendar.
    if ((route === "/calendar.ics" || route === "/trip.ics") && (request.method === "GET" || request.method === "HEAD")) {
      const state = await getStoredState();
      const ics = buildICS(state as Record<string, unknown>, tripInfo);
      return new Response(request.method === "HEAD" ? null : ics, {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "text/calendar; charset=utf-8",
          "Cache-Control": "public, max-age=900",
          "Content-Disposition": 'inline; filename="guantones-trip.ics"'
        }
      });
    }

    const session = await currentSession(request);
    if (!session) {
      return json({ ok: false, needsProfile: true, message: "Sign in required." }, 401);
    }

    if (route === "/passkey/status" && request.method === "GET") {
      const { rpID } = passkeyOriginInfo(request);
      const count = (await listPasskeysForPerson(session.user.personId, rpID)).length;
      return json({ ok: true, count, rpID });
    }

    if (route === "/passkey/register/options" && request.method === "POST") {
      await cleanupExpiredPasskeyChallenges();
      const { origin, rpID } = passkeyOriginInfo(request);
      const existing = await listPasskeysForPerson(session.user.personId, rpID);
      const options = await generateRegistrationOptions({
        rpName: PASSKEY_RP_NAME,
        rpID,
        userID: passkeyUserId(session.user.personId),
        userName: session.user.personId,
        userDisplayName: session.user.firstName,
        attestationType: "none",
        authenticatorSelection: {
          residentKey: "required",
          userVerification: "required"
        },
        excludeCredentials: existing.map((credential) => ({
          id: credential.credential_id,
          transports: parseTransportList(credential.transports)
        }))
      });
      await savePasskeyChallenge({
        challenge: options.challenge,
        flow: "register",
        personId: session.user.personId,
        familyId: session.user.familyId,
        rpID,
        origin
      });
      return json({ ok: true, options });
    }

    if (route === "/passkey/register/verify" && request.method === "POST") {
      await cleanupExpiredPasskeyChallenges();
      const body = await request.json();
      const challenge = textSafe(body.challenge);
      if (!challenge) return json({ ok: false, message: "Passkey challenge missing." }, 400);
      const challengeRow = await getPasskeyChallenge(challenge, "register");
      if (!challengeRow || challengeRow.person_id !== session.user.personId) {
        return json({ ok: false, message: "Passkey setup expired. Start again." }, 400);
      }
      const verification = await verifyRegistrationResponse({
        response: body.response,
        expectedChallenge: challengeRow.challenge,
        expectedOrigin: challengeRow.origin,
        expectedRPID: challengeRow.rp_id,
        requireUserVerification: true
      });
      if (!verification.verified || !verification.registrationInfo) {
        await deletePasskeyChallenge(challenge);
        return json({ ok: false, message: "Could not verify that passkey." }, 400);
      }
      await upsertPasskeyCredential({
        credentialId: verification.registrationInfo.credential.id,
        personId: session.user.personId,
        familyId: session.user.familyId,
        rpID: challengeRow.rp_id,
        publicKey: base64UrlFromBytes(verification.registrationInfo.credential.publicKey),
        counter: Number(verification.registrationInfo.credential.counter || 0),
        transports: parseTransportList(body.response?.response?.transports),
        deviceType: verification.registrationInfo.credentialDeviceType,
        backedUp: Boolean(verification.registrationInfo.credentialBackedUp)
      });
      await deletePasskeyChallenge(challenge);
      return json({ ok: true, message: "Passkey saved.", count: (await listPasskeysForPerson(session.user.personId, challengeRow.rp_id)).length });
    }

    if (route === "/me" && request.method === "GET") {
      return json({ ok: true, user: session.user, tripInfo });
    }

    if (route === "/state" && request.method === "GET") {
      const state = await getStoredState();
      return json({ ok: true, state, tripInfo });
    }

    if (route === "/action" && request.method === "POST") {
      const body = await request.json();
      const state = await getStoredState();
      const result = applyAction(state, { type: textSafe(body.type), payload: body.payload || {} }, session.user.familyId);
      if (!result.changed) return json({ ...result, state, tripInfo }, 409);
      const savedState = await saveStoredState(result.state as Record<string, unknown>);
      return json({ ...result, state: savedState, tripInfo });
    }

    return json({ ok: false, message: "Not found." }, 404);
  } catch (error) {
    return json({ ok: false, message: error instanceof Error ? error.message : "Request failed." }, 400);
  }
});
