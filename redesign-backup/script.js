/* Cabin Plan — clean, Apple-style client.
   Reuses the existing server API (/api/state, /api/action, /api/events).
   The experience: pick who you are once, then a personal Home that shows
   what's left, one-tap reversible claims, and four simple tabs. */

/* ------------------------------------------------------------------ */
/* Icons (inline SVG)                                                  */
/* ------------------------------------------------------------------ */
const icons = {
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/></svg>',
  utensils: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 3v8"/><path d="M8 3v8"/><path d="M4 7h4"/><path d="M6 11v10"/><path d="M19 3v18"/><path d="M15 3v5a4 4 0 0 0 4 4"/></svg>',
  bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8h12l1 13H5L6 8Z"/><path d="M9 8a3 3 0 0 1 6 0"/></svg>',
  mountain: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m3 20 7-13 5 8 2-3 4 8H3Z"/><path d="m10 7 2.5 4"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m20 6-11 11-5-5"/></svg>',
  checkCircle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="m8.5 12 2.5 2.5 4.5-5"/></svg>',
  chevron: '<svg viewBox="0 0 12 20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m2 2 8 8-8 8"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-7.5-4.6-10-9.3C.4 8.4 2 5 5.3 5c2 0 3.3 1.1 4.2 2.4l.5.7.5-.7C11.4 6.1 12.7 5 14.7 5 18 5 19.6 8.4 22 11.7 19.5 16.4 12 21 12 21Z"/></svg>',
  tent: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4 3.5 20h17L12 4Z"/><path d="M12 9v11"/><path d="m9 14 3 6 3-6"/></svg>'
};

function icon(name) {
  return icons[name] || "";
}

/* ------------------------------------------------------------------ */
/* Data catalog (labels / fallbacks). Live values come from the server */
/* ------------------------------------------------------------------ */
const families = [
  { id: "shell", name: "Shell", shortName: "Shell", color: "#d9512b", details: "Possible Thursday arrival" },
  { id: "nick", name: "Nick & Riss", shortName: "Nick", color: "#c2791f", details: "Kids food preferences needed" },
  { id: "nat", name: "Nat & Andy", shortName: "Nat", color: "#167fa6", details: "Meal ideas started" },
  { id: "bear", name: "J & Bear", shortName: "Bear", color: "#3f9142", details: "Gear list started" }
];

const defaultMeals = [
  { id: "fri-breakfast", day: "fri", dayLabel: "Fri Jul 3", type: "Breakfast", time: "7:00 - 10:00 AM", owner: "nick", idea: "Eggs, bacon, sausage", kids: "Pancakes, fruit", cold: ["eggs", "bacon", "milk"] },
  { id: "fri-lunch", day: "fri", dayLabel: "Fri Jul 3", type: "Lunch", time: "12:00 - 2:00 PM", owner: "", idea: "Sandwiches or pasta salad", kids: "PB&J, fruit", cold: ["lunch meat", "cheese"] },
  { id: "fri-dinner", day: "fri", dayLabel: "Fri Jul 3", type: "Dinner", time: "6:00 - 8:30 PM", owner: "nat", idea: "Steaks and baked potatoes", kids: "Butter pasta, nuggets", cold: ["steaks", "butter"] },
  { id: "fri-dessert", day: "fri", dayLabel: "Fri Jul 3", type: "Dessert", time: "After dinner", owner: "", idea: "S'mores and rice crispy treats", kids: "S'mores", cold: [] },
  { id: "sat-breakfast", day: "sat", dayLabel: "Sat Jul 4", type: "Breakfast", time: "7:00 - 10:00 AM", owner: "bear", idea: "Breakfast tacos", kids: "Eggs, tortillas, fruit", cold: ["eggs", "cheese"] },
  { id: "sat-lunch", day: "sat", dayLabel: "Sat Jul 4", type: "Lunch", time: "12:00 - 2:00 PM", owner: "", idea: "Lake sandwiches and snacks", kids: "Chips, fruit, yogurt tubes", cold: ["yogurt", "fruit"] },
  { id: "sat-dinner", day: "sat", dayLabel: "Sat Jul 4", type: "Dinner", time: "6:00 - 8:30 PM", owner: "shell", idea: "Burgers and hot dogs", kids: "Hot dogs, fruit", cold: ["burgers", "hot dogs", "cheese"] },
  { id: "sat-dessert", day: "sat", dayLabel: "Sat Jul 4", type: "Dessert", time: "After dinner", owner: "", idea: "Ice cream or s'mores", kids: "Rice crispy treats", cold: ["ice cream"] },
  { id: "sun-breakfast", day: "sun", dayLabel: "Sun Jul 5", type: "Breakfast", time: "7:00 - 10:00 AM", owner: "", idea: "Pancakes and fruit", kids: "Pancakes", cold: ["milk", "eggs"] },
  { id: "sun-lunch", day: "sun", dayLabel: "Sun Jul 5", type: "Lunch", time: "12:00 - 2:00 PM", owner: "", idea: "Leftovers and quesadillas", kids: "Quesadillas", cold: ["cheese"] },
  { id: "sun-dinner", day: "sun", dayLabel: "Sun Jul 5", type: "Dinner", time: "6:00 - 8:30 PM", owner: "nick", idea: "Chicken or pulled pork", kids: "Nuggets, butter pasta", cold: ["chicken"] },
  { id: "sun-dessert", day: "sun", dayLabel: "Sun Jul 5", type: "Dessert", time: "After dinner", owner: "", idea: "Finish sweets", kids: "Fruit, treats", cold: [] },
  { id: "mon-breakfast", day: "mon", dayLabel: "Mon Jul 6", type: "Breakfast", time: "Pack-up morning", owner: "", idea: "Coffee, pastries, leftovers", kids: "Cereal, fruit", cold: ["milk"] },
  { id: "mon-cleanup", day: "mon", dayLabel: "Mon Jul 6", type: "Pack-up", time: "Before checkout", owner: "bear", idea: "Fridge clear-out and trash", kids: "Road snacks", cold: [] }
];

const defaultSupplies = [
  { id: "plates", name: "Paper plates", qty: "Need 100", type: "dry goods", owner: "shell" },
  { id: "cups", name: "Cups", qty: "Need 100", type: "dry goods", owner: "" },
  { id: "utensils", name: "Utensils", qty: "Need 100", type: "dry goods", owner: "bear" },
  { id: "paper-towels", name: "Paper towels", qty: "Need 4 rolls", type: "dry goods", owner: "" },
  { id: "trash", name: "Trash bags", qty: "Need 1 box", type: "dry goods", owner: "nat" },
  { id: "ice", name: "Ice", qty: "Buy near cabin", type: "cold", owner: "" },
  { id: "water", name: "Water jugs", qty: "Need 3", type: "dry goods", owner: "nick" },
  { id: "coffee", name: "Coffee and tea", qty: "Enough for 4 mornings", type: "dry goods", owner: "bear" },
  { id: "smores", name: "S'mores ingredients", qty: "Marshmallows, grahams, chocolate", type: "dry goods", owner: "" },
  { id: "eggs", name: "Eggs", qty: "One shared buy, not four cartons", type: "cold", owner: "nick" },
  { id: "milk", name: "Milk", qty: "Shared breakfast amount", type: "cold", owner: "" },
  { id: "seltzers", name: "Seltzers and lemonade", qty: "Drinks cooler", type: "cold", owner: "nat" },
  { id: "propane", name: "Propane", qty: "Check tanks", type: "gear", owner: "" },
  { id: "coolers", name: "Extra coolers", qty: "Need 2", type: "gear", owner: "bear" },
  { id: "games", name: "Puzzles and kid games", qty: "Rain backup", type: "gear", owner: "" },
  { id: "gloves", name: "Baseball gloves", qty: "Outdoor play", type: "gear", owner: "" }
];

const activities = [
  { id: "white-pines", name: "White Pines Lake", notes: "Beach, picnic, playground, disc golf", tags: ["Kid-friendly", "Low effort"], votes: 3 },
  { id: "big-trees", name: "Calaveras Big Trees", notes: "Giant sequoias, easy North Grove loop", tags: ["Must-do", "Shade", "4 mi away"], votes: 4 },
  { id: "logging", name: "Logging Museum + Rim Trail", notes: "Museum, lake add-on, easy first mile", tags: ["Short outing"], votes: 2 },
  { id: "lake-alpine", name: "Lake Alpine", notes: "Bigger alpine lake, boating, hiking", tags: ["Day trip"], votes: 2 },
  { id: "big-trees-market", name: "Big Trees Market", notes: "Backup groceries, ice, sandwiches", tags: ["Errand"], votes: 1 },
  { id: "bear-valley", name: "Bear Valley Adventure Co.", notes: "Rentals, snacks, gas", tags: ["Rentals"], votes: 1 }
];

const dayOrder = ["fri", "sat", "sun", "mon"];
const dayMeta = {
  fri: { dayLabel: "Fri Jul 3", fullLabel: "Friday, July 3" },
  sat: { dayLabel: "Sat Jul 4", fullLabel: "Saturday, July 4" },
  sun: { dayLabel: "Sun Jul 5", fullLabel: "Sunday, July 5" },
  mon: { dayLabel: "Mon Jul 6", fullLabel: "Monday, July 6" }
};

const supplyGroups = [
  { type: "dry goods", label: "Dry goods" },
  { type: "cold", label: "Cold & cooler" },
  { type: "gear", label: "Gear" }
];

const cabinInfo = [
  { label: "Where", value: "Arnold, CA", tbd: false },
  { label: "Address", value: "Not set yet", tbd: true },
  { label: "Dates", value: "Jul 2 – 6, 2026", tbd: false },
  { label: "Checkout", value: "Mon Jul 6 · time TBD", tbd: true },
  { label: "Door code", value: "Not set yet", tbd: true },
  { label: "Wi-Fi", value: "Not set yet", tbd: true }
];

const gearOptions = ["Pizza oven", "Blackstone", "Fire pit", "Propane", "Coolers", "Camp chairs", "Kid games", "Baseball gloves"];

/* ------------------------------------------------------------------ */
/* Storage + identity                                                  */
/* ------------------------------------------------------------------ */
const storageKey = "cabin-game-plan-v1";
const selectedFamilyKey = "cabin-game-plan-selected-family-v1";
const clientIdKey = "cabin-game-plan-client-id-v1";
const authPasscodeKey = "cabin-game-plan-passcode-v1";
const authHeaderName = "x-cabin-passcode";

function safeGetItem(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}
function safeSetItem(key, value) {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}
function safeRemoveItem(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    /* ignore */
  }
}

function getClientId() {
  let id = safeGetItem(clientIdKey) || "";
  if (!id) {
    id = crypto.randomUUID ? crypto.randomUUID() : `client-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    safeSetItem(clientIdKey, id);
  }
  return id;
}

const api = { clientId: getClientId(), eventSource: null, syncMode: "connecting", syncLabel: "Connecting" };

function loadLocalState() {
  try {
    const saved = JSON.parse(safeGetItem(storageKey));
    if (saved && saved.meals && saved.supplies) return normalizeClientState(saved);
  } catch {
    /* ignore corrupt data */
  }
  return normalizeClientState({});
}

function normalizeClientState(s) {
  return {
    meals: Array.isArray(s.meals) ? s.meals : defaultMeals,
    supplies: Array.isArray(s.supplies) ? s.supplies : defaultSupplies,
    familyChecks: s.familyChecks && typeof s.familyChecks === "object" ? s.familyChecks : { bear: true },
    familyResponses: s.familyResponses && typeof s.familyResponses === "object" ? s.familyResponses : {},
    activityVotes: s.activityVotes && typeof s.activityVotes === "object"
      ? s.activityVotes
      : Object.fromEntries(activities.map((a) => [a.id, a.votes])),
    version: Number(s.version || 1),
    updatedAt: s.updatedAt || null
  };
}

function loadSelectedFamily() {
  const saved = safeGetItem(selectedFamilyKey);
  return families.some((f) => f.id === saved) ? saved : "";
}

let state = loadLocalState();
let selectedFamily = loadSelectedFamily();
let authPasscode = (new URLSearchParams(location.search).get("passcode") || safeGetItem(authPasscodeKey) || "").trim();
let activeTab = "home";
let sheetSaveHandler = null;

// Clean the passcode out of the visible URL.
if (new URLSearchParams(location.search).get("passcode")) {
  const url = new URL(location.href);
  url.searchParams.delete("passcode");
  history.replaceState({}, "", url.pathname + url.search + url.hash);
}

/* ------------------------------------------------------------------ */
/* Small helpers                                                       */
/* ------------------------------------------------------------------ */
function me() {
  return selectedFamily;
}
function familyById(id) {
  return families.find((f) => f.id === id);
}
function initials(fam) {
  return (fam.shortName || fam.name || "?").slice(0, 2);
}
function escapeText(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
function avatar(fam, cls = "") {
  return `<span class="avatar ${cls}" style="--c:${fam.color}">${escapeText(initials(fam))}</span>`;
}
function voteCount(id) {
  const seed = (activities.find((a) => a.id === id) || {}).votes || 0;
  return Number(state.activityVotes[id] ?? seed);
}

/* ------------------------------------------------------------------ */
/* Network layer (unchanged contract with the server)                  */
/* ------------------------------------------------------------------ */
function normalizePasscode(value) {
  return String(value || "").trim().slice(0, 120);
}
function rememberAuthPasscode(value) {
  const next = normalizePasscode(value);
  if (!next) {
    safeRemoveItem(authPasscodeKey);
    authPasscode = "";
    return false;
  }
  safeSetItem(authPasscodeKey, next);
  authPasscode = next;
  return true;
}
async function promptForPasscode() {
  const provided = window.prompt("Enter trip passcode");
  if (!provided) return false;
  return rememberAuthPasscode(provided);
}
function getRequestInit(base = {}) {
  const headers = new Headers(base.headers || {});
  if (authPasscode) headers.set(authHeaderName, authPasscode);
  return { ...base, headers };
}
function withPasscodeQuery(path) {
  if (!authPasscode) return path;
  const next = new URL(path, location.href);
  if (!next.searchParams.get("passcode")) next.searchParams.set("passcode", authPasscode);
  return next.pathname + next.search;
}
function authAwareRequest(path, init = {}) {
  return fetch(withPasscodeQuery(path), getRequestInit(init));
}
async function fetchStateWithAuth() {
  const response = await authAwareRequest("/api/state", { cache: "no-store" });
  if (response.status === 401 || response.status === 403) {
    if (await promptForPasscode()) {
      const retry = await authAwareRequest("/api/state", { cache: "no-store" });
      if (retry.status === 200) return retry;
    }
    throw new Error("UNAUTHORIZED");
  }
  return response;
}
function applySharedState(next) {
  state = normalizeClientState(next);
  safeSetItem(storageKey, JSON.stringify(state));
  render();
}
function setSyncStatus(mode, label) {
  api.syncMode = mode;
  api.syncLabel = label;
  document.querySelectorAll(".sync-dot").forEach((dot) => {
    dot.classList.remove("is-live", "is-offline", "is-connecting");
    dot.classList.add(`is-${mode}`);
    dot.title = label;
  });
}
async function connectSharedState() {
  if (!location.protocol.startsWith("http")) {
    setSyncStatus("offline", "On this device");
    return;
  }
  setSyncStatus("connecting", "Connecting");
  try {
    const response = await fetchStateWithAuth();
    if (!response.ok) throw new Error("unavailable");
    const payload = await response.json();
    applySharedState(payload.state);
    setSyncStatus("live", "Live");
    startEventStream();
  } catch {
    setSyncStatus("offline", "On this device");
  }
}
function startEventStream() {
  if (!window.EventSource || api.eventSource) return;
  api.eventSource = new EventSource(withPasscodeQuery("/api/events"));
  api.eventSource.addEventListener("state", (event) => {
    try {
      applySharedState(JSON.parse(event.data));
      setSyncStatus("live", "Live");
    } catch {
      setSyncStatus("offline", "Sync error");
    }
  });
  api.eventSource.onopen = () => setSyncStatus("live", "Live");
  api.eventSource.onerror = () => setSyncStatus("connecting", "Reconnecting");
}
async function performAction(type, payload, successMessage) {
  if (!location.protocol.startsWith("http")) {
    showToast("Sharing is off on this device.");
    return false;
  }
  try {
    const response = await authAwareRequest("/api/action", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ type, payload, clientId: api.clientId })
    });
    if (response.status === 401 || response.status === 403) {
      if (await promptForPasscode()) return performAction(type, payload, successMessage);
      showToast("Passcode required.");
      return false;
    }
    const result = await response.json();
    if (result.state) applySharedState(result.state);
    if (successMessage && response.ok) showToast(successMessage);
    else if (!response.ok) showToast(result.message || "Couldn't save.");
    return response.ok;
  } catch {
    setSyncStatus("offline", "On this device");
    showToast("Couldn't reach the cabin server.");
    return false;
  }
}

/* ------------------------------------------------------------------ */
/* Rendering                                                           */
/* ------------------------------------------------------------------ */
const viewEl = () => document.querySelector("#view");

function render() {
  if (!selectedFamily) return;
  if (activeTab === "home") renderHome();
  else if (activeTab === "meals") renderMeals();
  else if (activeTab === "supplies") renderSupplies();
  else if (activeTab === "trip") renderTrip();
  setSyncStatus(api.syncMode, api.syncLabel);
}

function setTab(tab) {
  activeTab = tab;
  document.querySelectorAll(".tab").forEach((b) => b.classList.toggle("is-active", b.dataset.tab === tab));
  render();
  window.scrollTo({ top: 0, behavior: "auto" });
}

// One reusable claim control for meals and supplies.
function claimControl(kind, item) {
  if (!item.owner) {
    const label = kind === "meal" ? "I'll bring it" : "I've got it";
    return `<button class="pill" data-act="toggle" data-kind="${kind}" data-id="${item.id}">${label}</button>`;
  }
  if (item.owner === me()) {
    return `<button class="claimed-me" data-act="toggle" data-kind="${kind}" data-id="${item.id}" aria-label="You've got this — tap to release">${icon("check")} You</button>`;
  }
  const fam = familyById(item.owner);
  return fam ? `<span class="claimed-other">${avatar(fam)} ${escapeText(fam.shortName)}</span>` : "";
}

function mealRow(meal) {
  return `<div class="row">
    <div class="row-body">
      <div class="row-title">${escapeText(meal.type)}</div>
      <div class="row-sub">${escapeText(meal.idea)}</div>
      <div class="row-sub kids">Kids: ${escapeText(meal.kids)}</div>
    </div>
    ${claimControl("meal", meal)}
  </div>`;
}
function supplyRow(item) {
  return `<div class="row">
    <div class="row-body">
      <div class="row-title">${escapeText(item.name)}</div>
      <div class="row-sub">${escapeText(item.qty)}</div>
    </div>
    ${claimControl("supply", item)}
  </div>`;
}
function addRow(act, label) {
  return `<button class="row" data-act="${act}">
    <span class="row-lead">${icon("plus")}</span>
    <span class="row-body"><span class="row-title" style="color:var(--accent)">${escapeText(label)}</span></span>
  </button>`;
}

function hero() {
  const fam = familyById(me());
  return `<header class="hero">
    <div class="hero-media"></div>
    <div class="hero-top">
      <span class="sync-dot is-${api.syncMode}" title="${escapeText(api.syncLabel)}"></span>
      <button class="me-chip" data-act="switch">${avatar(fam)}${escapeText(fam.shortName)}</button>
    </div>
    <div class="hero-content">
      <div class="hero-kicker">Cabin trip · Arnold, CA</div>
      <h1 class="hero-name">Hi, ${escapeText(fam.shortName)}</h1>
      <div class="hero-dates">July 2 – 6, 2026</div>
    </div>
  </header>`;
}

function renderHome() {
  const meals = state.meals;
  const supplies = state.supplies;
  const total = meals.length + supplies.length;
  const covered = meals.filter((m) => m.owner).length + supplies.filter((s) => s.owner).length;
  const pct = total ? Math.round((covered / total) * 100) : 0;

  const openItems = [
    ...meals.filter((m) => !m.owner).map((m) => ({ kind: "meal", item: m })),
    ...supplies.filter((s) => !s.owner).map((s) => ({ kind: "supply", item: s }))
  ];
  const mine = [
    ...meals.filter((m) => m.owner === me()).map((m) => ({ kind: "meal", item: m })),
    ...supplies.filter((s) => s.owner === me()).map((s) => ({ kind: "supply", item: s }))
  ];
  const checkedIn = !!state.familyChecks[me()];

  let html = hero();

  html += `<div class="stat-card">
    <div class="stat-top">
      <span class="stat-count"><b>${covered}</b> of ${total} covered</span>
      <span class="stat-pct">${pct}%</span>
    </div>
    <div class="progress"><span style="width:${pct}%"></span></div>
    <div class="stat-hint">${openItems.length ? `${openItems.length} thing${openItems.length === 1 ? "" : "s"} still need someone` : "Everything's claimed — you're set."}</div>
  </div>`;

  html += `<div class="screen-body">`;

  if (!checkedIn) {
    html += `<button class="nudge" data-act="checkin">
      <span class="row-lead">${icon("checkCircle")}</span>
      <span class="nudge-body">
        <span class="nudge-title">Check in</span>
        <span class="nudge-sub">Share your arrival, foods, and gear</span>
      </span>
      <span class="chevron">${icon("chevron")}</span>
    </button>`;
  }

  html += `<div class="section-label">Still needs someone</div>`;
  if (openItems.length === 0) {
    html += `<div class="group"><div class="allset">
      <div class="allset-mark">${icon("checkCircle")}</div>
      <div class="allset-title">Everything's covered</div>
      <div class="allset-sub">Nice — the whole trip is claimed.</div>
    </div></div>`;
  } else {
    const shown = openItems.slice(0, 6);
    html += `<div class="group">${shown.map((o) => (o.kind === "meal" ? mealRowCompact(o.item) : supplyRow(o.item))).join("")}</div>`;
    if (openItems.length > shown.length) {
      html += `<div class="more-hint">+ ${openItems.length - shown.length} more in Meals & Supplies</div>`;
    }
  }

  if (mine.length) {
    html += `<div class="section-label">You're bringing</div>`;
    html += `<div class="group">${mine.map((o) => (o.kind === "meal" ? mealRowCompact(o.item) : supplyRow(o.item))).join("")}</div>`;
  }

  html += `</div>`;
  viewEl().innerHTML = html;
}

// Compact meal row for Home (no kids line, with day context).
function mealRowCompact(meal) {
  return `<div class="row">
    <div class="row-body">
      <div class="row-title">${escapeText(meal.type)}</div>
      <div class="row-sub">${escapeText((dayMeta[meal.day] || {}).dayLabel || "")} · ${escapeText(meal.idea)}</div>
    </div>
    ${claimControl("meal", meal)}
  </div>`;
}

function renderMeals() {
  let html = `<div class="screen-body"><div class="screen-head">
    <h1 class="large-title">Meals</h1>
    <p class="screen-sub">Tap to claim a meal slot</p>
  </div>`;

  for (const day of dayOrder) {
    const meals = state.meals.filter((m) => m.day === day);
    if (!meals.length) continue;
    html += `<div class="section-label">${escapeText(dayMeta[day].fullLabel)}</div>`;
    html += `<div class="group">${meals.map(mealRow).join("")}</div>`;
  }
  html += `<div class="section-label">Add</div><div class="group">${addRow("addMeal", "Add a meal idea")}</div>`;
  html += `</div>`;
  viewEl().innerHTML = html;
}

function renderSupplies() {
  let html = `<div class="screen-body"><div class="screen-head">
    <h1 class="large-title">Supplies</h1>
    <p class="screen-sub">Claim what you'll bring</p>
  </div>`;

  for (const grp of supplyGroups) {
    const items = state.supplies.filter((s) => s.type === grp.type);
    if (!items.length) continue;
    html += `<div class="section-label">${escapeText(grp.label)}</div>`;
    html += `<div class="group">${items.map(supplyRow).join("")}</div>`;
  }
  html += `<div class="section-label">Add</div><div class="group">${addRow("addSupply", "Add an item")}</div>`;
  html += `</div>`;
  viewEl().innerHTML = html;
}

function renderTrip() {
  let html = `<div class="screen-body"><div class="screen-head">
    <h1 class="large-title">Trip</h1>
    <p class="screen-sub">Who's coming, the cabin, and ideas</p>
  </div>`;

  // Who's coming
  html += `<div class="section-label">Who's coming</div><div class="group">`;
  for (const fam of families) {
    const checked = !!state.familyChecks[fam.id];
    const resp = state.familyResponses[fam.id];
    let sub = fam.details;
    if (resp && (resp.arrival || resp.leaving)) {
      sub = [resp.arrival && `In ${resp.arrival}`, resp.leaving && `out ${resp.leaving}`].filter(Boolean).join(" · ");
    } else if (checked) {
      sub = "Checked in";
    }
    let right;
    if (fam.id === me()) {
      right = `<button class="pill ${checked ? "soft" : ""}" data-act="checkin">${checked ? "Edit" : "Check in"}</button>`;
    } else {
      right = checked
        ? `<span class="claimed-other">${icon("check")}</span>`
        : `<span class="claimed-other">Waiting</span>`;
    }
    html += `<div class="row">
      ${avatar(fam)}
      <div class="row-body">
        <div class="row-title">${escapeText(fam.name)}</div>
        <div class="row-sub">${escapeText(sub)}</div>
      </div>
      ${right}
    </div>`;
  }
  html += `</div>`;

  // Cabin
  html += `<div class="section-label">Cabin</div><div class="group">`;
  for (const info of cabinInfo) {
    html += `<div class="row">
      <div class="row-body"><div class="row-title">${escapeText(info.label)}</div></div>
      <span class="info-val ${info.tbd ? "tbd" : ""}">${escapeText(info.value)}</span>
    </div>`;
  }
  html += `</div>`;

  // Ideas
  html += `<div class="section-label">Ideas — tap the heart to vote</div><div class="group">`;
  for (const act of activities) {
    html += `<div class="row">
      <div class="row-body">
        <div class="row-title">${escapeText(act.name)}</div>
        <div class="row-sub">${escapeText(act.notes)}</div>
        <div class="tags">${act.tags.map((t) => `<span class="tag">${escapeText(t)}</span>`).join("")}</div>
      </div>
      <button class="vote" data-act="vote" data-id="${act.id}">${icon("heart")} ${voteCount(act.id)}</button>
    </div>`;
  }
  html += `</div>`;

  html += `</div>`;
  viewEl().innerHTML = html;
}

/* ------------------------------------------------------------------ */
/* Welcome / family switcher                                           */
/* ------------------------------------------------------------------ */
function showWelcome(isSwitch) {
  const grid = document.querySelector("#familyGrid");
  grid.innerHTML = families
    .map((f) => `<button class="family-card ${f.id === me() ? "is-current" : ""}" data-fam="${f.id}">
      ${avatar(f, "lg")}
      <span class="family-card-name">${escapeText(f.name)}</span>
    </button>`)
    .join("");
  document.querySelector("#welcomeMark").innerHTML = icon("tent");
  document.querySelector("#welcomeSub").textContent = isSwitch ? "Switch who you are" : "Who's here?";
  document.querySelector("#welcomeCancel").hidden = !isSwitch;
  document.querySelector("#welcome").hidden = false;
}
function hideWelcome() {
  document.querySelector("#welcome").hidden = true;
}
function chooseFamily(id) {
  if (!familyById(id)) return;
  selectedFamily = id;
  safeSetItem(selectedFamilyKey, id);
  hideWelcome();
  document.querySelector("#app").hidden = false;
  setTab("home");
}

/* ------------------------------------------------------------------ */
/* Bottom sheet                                                        */
/* ------------------------------------------------------------------ */
function openSheet(title, bodyHtml, onSave, saveLabel = "Save") {
  document.querySelector("#sheetTitle").textContent = title;
  document.querySelector("#sheetBody").innerHTML = bodyHtml;
  document.querySelector("#sheetSave").textContent = saveLabel;
  sheetSaveHandler = onSave;
  document.querySelector("#sheetScrim").hidden = false;
  document.querySelector("#sheet").hidden = false;
}
function closeSheet() {
  document.querySelector("#sheet").hidden = true;
  document.querySelector("#sheetScrim").hidden = true;
  sheetSaveHandler = null;
}
function val(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : "";
}

function openCheckinSheet() {
  const r = state.familyResponses[me()] || {};
  const on = new Set(r.gear || []);
  const body = `
    <div class="field"><div class="field-label">When you arrive</div>
      <input class="input" id="f_arrival" placeholder="e.g. Thursday evening" value="${escapeText(r.arrival || "")}"></div>
    <div class="field"><div class="field-label">When you leave</div>
      <input class="input" id="f_leaving" placeholder="e.g. Monday after breakfast" value="${escapeText(r.leaving || "")}"></div>
    <div class="field"><div class="field-label">Kids' safe foods</div>
      <input class="input" id="f_kid" placeholder="e.g. Butter pasta, nuggets" value="${escapeText(r.kidFood || "")}"></div>
    <div class="field"><div class="field-label">Allergies / hard no's</div>
      <input class="input" id="f_all" placeholder="e.g. None" value="${escapeText(r.allergies || "")}"></div>
    <div class="field"><div class="field-label">Gear you're bringing</div>
      <div class="chip-row" id="f_gear">${gearOptions
        .map((g) => `<button type="button" class="chip ${on.has(g) ? "is-on" : ""}" data-gear="${escapeText(g)}">${escapeText(g)}</button>`)
        .join("")}</div></div>`;
  openSheet(`${familyById(me()).name} check-in`, body, async () => {
    const gear = [...document.querySelectorAll("#f_gear .chip.is-on")].map((c) => c.dataset.gear);
    const ok = await performAction("checkin", {
      familyId: me(),
      arrival: val("f_arrival"),
      leaving: val("f_leaving"),
      kidFood: val("f_kid"),
      allergies: val("f_all"),
      gear
    }, "You're checked in.");
    if (ok) closeSheet();
  }, "Done");
}

function openMealSheet() {
  const body = `
    <div class="field"><div class="field-label">Day</div>
      <select class="select" id="m_day">${dayOrder.map((d) => `<option value="${d}">${escapeText(dayMeta[d].fullLabel)}</option>`).join("")}</select></div>
    <div class="field"><div class="field-label">Meal</div>
      <input class="input" id="m_type" placeholder="e.g. Lunch"></div>
    <div class="field"><div class="field-label">Idea</div>
      <input class="input" id="m_idea" placeholder="e.g. Taco bar"></div>
    <div class="field"><div class="field-label">Kid backup</div>
      <input class="input" id="m_kids" placeholder="e.g. Nuggets, fruit"></div>`;
  openSheet("Add a meal idea", body, async () => {
    if (!val("m_idea")) { showToast("Add a meal idea first."); return; }
    const ok = await performAction("addMealIdea", {
      day: document.getElementById("m_day").value,
      type: val("m_type") || "Meal",
      idea: val("m_idea"),
      kids: val("m_kids")
    }, "Meal added.");
    if (ok) closeSheet();
  }, "Add");
}

function openSupplySheet() {
  const body = `
    <div class="field"><div class="field-label">Item</div>
      <input class="input" id="s_name" placeholder="e.g. Sunscreen"></div>
    <div class="field"><div class="field-label">Amount / notes</div>
      <input class="input" id="s_qty" placeholder="e.g. 2 bottles"></div>
    <div class="field"><div class="field-label">Type</div>
      <select class="select" id="s_type">
        <option value="dry goods">Dry goods</option>
        <option value="cold">Cold & cooler</option>
        <option value="gear">Gear</option>
      </select></div>`;
  openSheet("Add an item", body, async () => {
    if (!val("s_name")) { showToast("Name the item first."); return; }
    const ok = await performAction("addSupply", {
      name: val("s_name"),
      qty: val("s_qty"),
      type: document.getElementById("s_type").value
    }, "Item added.");
    if (ok) closeSheet();
  }, "Add");
}

/* ------------------------------------------------------------------ */
/* Toast                                                               */
/* ------------------------------------------------------------------ */
function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => { toast.hidden = true; }, 2200);
}

/* ------------------------------------------------------------------ */
/* Events                                                              */
/* ------------------------------------------------------------------ */
function handleActionClick(act, el) {
  if (act === "toggle") {
    const kind = el.dataset.kind;
    const id = el.dataset.id;
    const type = kind === "meal" ? "claimMeal" : "toggleSupply";
    performAction(type, { id, owner: me() });
  } else if (act === "vote") {
    performAction("voteActivity", { id: el.dataset.id }, "Vote added.");
  } else if (act === "checkin") {
    openCheckinSheet();
  } else if (act === "addMeal") {
    openMealSheet();
  } else if (act === "addSupply") {
    openSupplySheet();
  } else if (act === "switch") {
    showWelcome(true);
  }
}

function bindEvents() {
  // Fill static tab-bar icons.
  document.querySelectorAll(".tabbar [data-icon]").forEach((node) => {
    node.innerHTML = icon(node.dataset.icon);
  });

  document.querySelectorAll(".tab").forEach((btn) => {
    btn.addEventListener("click", () => setTab(btn.dataset.tab));
  });

  document.querySelector("#view").addEventListener("click", (event) => {
    const target = event.target.closest("[data-act]");
    if (target) handleActionClick(target.dataset.act, target);
  });

  // Welcome family picker
  document.querySelector("#familyGrid").addEventListener("click", (event) => {
    const card = event.target.closest("[data-fam]");
    if (card) chooseFamily(card.dataset.fam);
  });
  document.querySelector("#welcomeCancel").addEventListener("click", hideWelcome);

  // Sheet gear chips (delegated)
  document.querySelector("#sheetBody").addEventListener("click", (event) => {
    const chip = event.target.closest("[data-gear]");
    if (chip) chip.classList.toggle("is-on");
  });
  document.querySelector("#sheetSave").addEventListener("click", () => {
    if (sheetSaveHandler) sheetSaveHandler();
  });
  document.querySelector("#sheetCancel").addEventListener("click", closeSheet);
  document.querySelector("#sheetScrim").addEventListener("click", closeSheet);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !document.querySelector("#sheet").hidden) closeSheet();
  });
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator) || !location.protocol.startsWith("http")) return;
  navigator.serviceWorker.register("service-worker.js").catch(() => {});
}

/* ------------------------------------------------------------------ */
/* Init                                                                */
/* ------------------------------------------------------------------ */
function init() {
  bindEvents();
  if (selectedFamily) {
    document.querySelector("#app").hidden = false;
    setTab("home");
  } else {
    showWelcome(false);
  }
  connectSharedState();
  registerServiceWorker();
}

init();
