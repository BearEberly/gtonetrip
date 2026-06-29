// Builds a subscribable iCalendar (.ics) feed from the shared trip state.
// The trip runs July 1-6, 2026 in Arnold, CA (Pacific Daylight Time, UTC-7),
// so local times are converted to UTC by adding 7 hours (no DST changes in-window).

const DAY_DATES = {
  wed: [2026, 7, 1],
  thu: [2026, 7, 2],
  fri: [2026, 7, 3],
  sat: [2026, 7, 4],
  sun: [2026, 7, 5],
  mon: [2026, 7, 6]
};

const MEAL_LABELS = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
  dessert: "Dessert / Snacks",
  "pack-up": "Pack-up"
};

const FAMILY_LABELS = { shell: "Shell", nick: "G6", bear: "Jear", nat: "Riggs" };
const DAY_WORDS = { wednesday: "wed", thursday: "thu", friday: "fri", saturday: "sat", sunday: "sun", monday: "mon" };
const PDT_OFFSET = 7; // hours to add to local PDT to get UTC

function mealTypeKey(type) {
  const t = String(type || "").toLowerCase();
  if (t.includes("dessert")) return "dessert";
  if (t.includes("breakfast")) return "breakfast";
  if (t.includes("lunch")) return "lunch";
  if (t.includes("pack")) return "pack-up";
  if (t.includes("event")) return "event";
  return "dinner";
}

function pad(n) { return String(n).padStart(2, "0"); }

// Parse strings like "7:00 - 10:00 AM", "12:00 - 2:00 PM", "6:00 - 8:30 PM".
// Returns { sh, sm, eh, em } in 24h local time, or null if not parseable.
function parseTimeRange(value) {
  const str = String(value || "").toLowerCase();
  const m = str.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?\s*(?:-|–|—|to)\s*(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/);
  if (!m) {
    const single = str.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)/);
    if (!single) return null;
    let h = Number(single[1]); const mm = Number(single[2] || 0);
    if (single[3] === "pm" && h < 12) h += 12;
    if (single[3] === "am" && h === 12) h = 0;
    return { sh: h, sm: mm, eh: h + 1, em: mm };
  }
  let sh = Number(m[1]); const sm = Number(m[2] || 0);
  let eh = Number(m[4]); const em = Number(m[5] || 0);
  const startMer = m[3]; const endMer = m[6] || m[3];
  const apply = (h, mer) => {
    if (mer === "pm" && h < 12) return h + 12;
    if (mer === "am" && h === 12) return 0;
    return h;
  };
  sh = apply(sh, startMer || endMer);
  eh = apply(eh, endMer);
  return { sh, sm, eh, em };
}

function utcStamp([y, mo, d], h, m) {
  const dt = new Date(Date.UTC(y, mo - 1, d, h + PDT_OFFSET, m, 0));
  return `${dt.getUTCFullYear()}${pad(dt.getUTCMonth() + 1)}${pad(dt.getUTCDate())}T${pad(dt.getUTCHours())}${pad(dt.getUTCMinutes())}00Z`;
}

function dateStamp([y, mo, d]) { return `${y}${pad(mo)}${pad(d)}`; }
function nextDate([y, mo, d]) {
  const dt = new Date(Date.UTC(y, mo - 1, d + 1));
  return [dt.getUTCFullYear(), dt.getUTCMonth() + 1, dt.getUTCDate()];
}

function esc(value) {
  return String(value || "")
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

// Fold lines longer than 75 octets per RFC 5545.
function fold(line) {
  if (line.length <= 73) return line;
  const out = [];
  let s = line;
  out.push(s.slice(0, 73));
  s = s.slice(73);
  while (s.length > 72) { out.push(" " + s.slice(0, 72)); s = s.slice(72); }
  if (s.length) out.push(" " + s);
  return out.join("\r\n");
}

function nowStamp() {
  const dt = new Date();
  return `${dt.getUTCFullYear()}${pad(dt.getUTCMonth() + 1)}${pad(dt.getUTCDate())}T${pad(dt.getUTCHours())}${pad(dt.getUTCMinutes())}${pad(dt.getUTCSeconds())}Z`;
}

function bringingNamesForMeal(state, meal) {
  const supplies = Array.isArray(state.supplies) ? state.supplies : [];
  const key = mealTypeKey(meal.type);
  return supplies
    .filter((it) => String(it.type || "").toLowerCase() === "food")
    .filter((it) => (it.owner && [it.owner]) || it.createdBy)
    .filter((it) => !it.days || !it.days.length || it.days.includes(meal.day))
    .filter((it) => it.mealType === "any" || it.mealType === key)
    .map((it) => it.name)
    .filter(Boolean);
}

export function buildICS(state, tripInfo = {}) {
  const meals = Array.isArray(state.meals) ? state.meals : [];
  const location = tripInfo.address || "Arnold, California";
  const stamp = nowStamp();
  const lines = [];
  const push = (l) => lines.push(fold(l));

  push("BEGIN:VCALENDAR");
  push("VERSION:2.0");
  push("PRODID:-//Guantones Trip//4th of July 2026//EN");
  push("CALSCALE:GREGORIAN");
  push("METHOD:PUBLISH");
  push("X-WR-CALNAME:4th of July 2026 — Guantones Trip");
  push("X-WR-TIMEZONE:America/Los_Angeles");
  push("REFRESH-INTERVAL;VALUE=DURATION:PT1H");
  push("X-PUBLISHED-TTL:PT1H");

  const addEvent = ({ uid, summary, description, day, range }) => {
    const date = DAY_DATES[day];
    if (!date) return;
    push("BEGIN:VEVENT");
    push(`UID:${esc(uid)}@gtonetrip`);
    push(`DTSTAMP:${stamp}`);
    if (range) {
      push(`DTSTART:${utcStamp(date, range.sh, range.sm)}`);
      push(`DTEND:${utcStamp(date, range.eh, range.em)}`);
    } else {
      push(`DTSTART;VALUE=DATE:${dateStamp(date)}`);
      push(`DTEND;VALUE=DATE:${dateStamp(nextDate(date))}`);
    }
    push(`SUMMARY:${esc(summary)}`);
    if (description) push(`DESCRIPTION:${esc(description)}`);
    if (location) push(`LOCATION:${esc(location)}`);
    push("END:VEVENT");
  };

  // Arrivals (all-day) from family logistics
  const responses = (state.familyResponses && typeof state.familyResponses === "object") ? state.familyResponses : {};
  for (const famId of Object.keys(FAMILY_LABELS)) {
    const arrival = responses[famId] && responses[famId].arrival;
    const text = String(arrival || "").toLowerCase();
    const dayKey = Object.keys(DAY_WORDS).find((w) => text.includes(w));
    if (dayKey) {
      addEvent({
        uid: `arrival-${famId}`,
        summary: `${FAMILY_LABELS[famId]} arrives`,
        description: arrival,
        day: DAY_WORDS[dayKey]
      });
    }
  }

  // Meals and non-food events
  for (const meal of meals) {
    const key = mealTypeKey(meal.type);
    if (key === "event") {
      addEvent({
        uid: `event-${meal.id}`,
        summary: meal.idea || "Trip event",
        description: meal.kids || meal.time || "",
        day: meal.day,
        range: parseTimeRange(meal.kids) || parseTimeRange(meal.time)
      });
      continue;
    }
    if (!meal.idea) continue;
    const bringing = bringingNamesForMeal(state, meal);
    const descParts = [];
    if (meal.kids) descParts.push(`Kid backup: ${meal.kids}`);
    if (bringing.length) descParts.push(`Bringing: ${bringing.join(", ")}`);
    addEvent({
      uid: `meal-${meal.id}`,
      summary: `${MEAL_LABELS[key] || "Meal"}: ${meal.idea}`,
      description: descParts.join("\n"),
      day: meal.day,
      range: parseTimeRange(meal.time)
    });
  }

  push("END:VCALENDAR");
  return lines.join("\r\n") + "\r\n";
}
