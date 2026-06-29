# Subscribable Trip Calendar (.ics)

The app now publishes a live calendar feed that anyone can subscribe to in Apple
Calendar or Google Calendar. It is regenerated from the current trip state every
time it is fetched, so when meals/plans change, subscribers' calendars update on
their next refresh.

## What was added

- `calendar-feed.js` — builds a valid iCalendar (`.ics`) document from the trip
  state (meals, non-food events, and family arrivals). Times are Pacific (PDT,
  July 2026) converted to UTC.
- **Local server** (`server.js`): public route `GET /trip.ics` (and `/calendar.ics`).
- **Production** (`supabase/functions/trip-api/index.ts`): public route
  `GET /calendar.ics` (and `/trip.ics`), served before the login check.
- **UI**: a "Subscribe to this calendar" card on the Calendar tab with
  **Add to Apple Calendar** (opens `webcal://`) and **Copy link** buttons.

## Deploy the production feed

Apple Calendar fetches the feed with **no auth headers**, so the Supabase
function must allow unauthenticated requests:

```bash
supabase functions deploy trip-api --no-verify-jwt
```

(`--no-verify-jwt` only removes Supabase's gateway JWT requirement. The app's own
login still protects all the read/write routes — only `/calendar.ics` is public.)

## The subscribe URLs

Based on `app-config.js` (`supabaseUrl = https://qriowkpqhgxjnapxpdgc.supabase.co`):

- **HTTPS (Google Calendar, "From URL"):**
  `https://qriowkpqhgxjnapxpdgc.supabase.co/functions/v1/trip-api/calendar.ics`
- **Apple Calendar (webcal):**
  `webcal://qriowkpqhgxjnapxpdgc.supabase.co/functions/v1/trip-api/calendar.ics`

The in-app **Add to Apple Calendar** button builds the `webcal://` link
automatically; **Copy link** copies the HTTPS link for Google or sharing.

### How people subscribe

- **iPhone/Mac:** tap **Add to Apple Calendar** (or open the `webcal://` link).
  Calendar asks to add a subscribed calendar — done.
- **Google Calendar:** Other calendars → **From URL** → paste the HTTPS link.

## How often it updates

Subscribed calendars are **pull-based** — the phone re-downloads the feed on a
schedule, so changes appear on the next refresh rather than instantly. The feed
advertises an hourly refresh (`REFRESH-INTERVAL / X-PUBLISHED-TTL = PT1H`), but
Apple ultimately controls timing (iPhone: Settings → Apps → Calendar → Account →
Fetch New Data; or the per-subscription "Auto-refresh" you pick when adding it).
In practice expect updates within roughly an hour, not real-time.

## Test locally

```bash
npm start
# then open or curl:
curl http://localhost:8000/trip.ics
```

## Optional: make the feed private

The feed is currently public (anyone with the URL can view the schedule — no
personal data beyond meal plans and the house address in LOCATION). To gate it,
add a secret token check in the `/calendar.ics` handler (e.g. require
`?key=...`) and share the tokenized URL only with family.
