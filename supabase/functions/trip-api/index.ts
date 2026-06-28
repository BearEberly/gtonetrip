import { createClient } from "npm:@supabase/supabase-js@2";

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
    (next.supplies as Record<string, unknown>[]).push({
      id: `supply-${Date.now()}`,
      name,
      notes: textSafe(payload.qty),
      qty: textSafe(payload.qty),
      type: bringingTypeSafe(payload.type),
      owner: "",
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
    supply.name = name;
    supply.notes = textSafe(payload.qty);
    supply.qty = textSafe(payload.qty);
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

    const session = await currentSession(request);
    if (!session) {
      return json({ ok: false, needsProfile: true, message: "Sign in required." }, 401);
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
