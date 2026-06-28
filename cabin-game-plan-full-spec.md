# Cabin Game Plan — Full App Specification

**Project path:** `/Users/bearbear/Documents/Work - Label Files/Folders/Guantones app`

**Last captured:** 2026-06-27

## Current Update - June 28, 2026

The app has now moved off the local JSON/Node backend as the primary shared backend.

Current public-URL expectations:

- The frontend is a static HTML/CSS/JS site.
- The intended production host is Cloudflare Pages.
- Shared login and trip updates now flow through a Supabase Edge Function named `trip-api`.
- Shared state and simple sessions are stored in Supabase Postgres.
- `app-config.js` points the frontend at the Supabase project and publishable key.
- The older Node server remains useful as a local static preview server and legacy fallback, but it is no longer the intended production backend.

Current profile/auth model:

- Public users tap their name from the attendee picker, then enter a trip invite code, email, and optional password.
- The attendee picker pre-fills first name and family/household.
- Profiles store an optional `personId` so multiple named people can share one email while remaining separate profiles.
- Password is optional. If an existing profile has a password, it is required for that profile.
- Apple passkey / Face ID / Touch ID setup is supported after profile creation through WebAuthn.
- Existing passwordless profiles can be resumed only under their already assigned family from a fresh session; a fresh session cannot move an existing email to another household.
- Existing profile details can be changed only by the active profile session or by verifying the profile password.
- WebAuthn registration and sign-in now require user verification, matching the Apple passkey / Face ID / Touch ID intent on supported devices.
- Passkeys require a secure context, so they are intended for HTTPS public URLs and localhost.
- Profile sessions are stored in an HttpOnly cookie named `cabin_profile_session`.
- App passcode auth is stored in an HttpOnly cookie named `cabin_trip_auth`.
- Claims and check-ins derive family ownership from the signed-in profile, not from client-provided owner fields.
- The client auth UI is a full-screen app overlay instead of a browser-native prompt.
- EventSource uses cookies and no longer puts the passcode in the URL.
- The dashboard includes a dismissible install panel after login when the app is not already running from the Home Screen.
- Browsers with native PWA install support use the captured `beforeinstallprompt`; iPhone Safari users are guided to Share -> Add to Home Screen.
- The service worker exposes an update-ready path for a waiting app shell and now uses cache `cabin-game-plan-v11`.
- HTTP/HTTPS shared writes no longer fall back to local-only mutation when the API is unreachable. Users are told to reconnect and try again so the shared board stays authoritative.
- After sign-in, family pickers are locked to the profile family and explain that signing out is required to switch households.
- Shell/cabin logistics checklist items are now stored in shared state under `checklists`.
- Meal claims are reversible by the signed-in family that owns the meal.
- User-added meal ideas and supply items are editable/deletable only by the creating or owning family; starter plan rows are protected from deletion.
- Activity voting is now a signed-in family toggle. Existing numeric vote totals remain as baseline counts, and new votes are tracked under `activityVoters[activityId][familyId]`.
- Unknown activity IDs are rejected server-side.

Current auth/profile API additions:

- `GET /api/me`
- `POST /api/auth/continue`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `POST /api/passkey/register/options`
- `POST /api/passkey/register/verify`
- `POST /api/passkey/auth/options`
- `POST /api/passkey/auth/verify`

Current action additions:

- `toggleChecklist`
- `updateMealIdea`
- `deleteMealIdea`
- `updateSupply`
- `deleteSupply`

The older same-Wi-Fi notes below remain useful for local testing, but the preferred sharing model is now a public HTTPS URL that can be added to an iPhone Home Screen.

Current login flow:

- choose one adult name
- enter the shared password `1333`
- adult login choices: Shell, Nick, Marissa, Bear, Jessica, Andy, Natalie
- kids remain part of the trip data but do not log in

The selected adult is stored as `personId`, which still ties claims, checklists, and votes to the correct household.

## 1) Purpose and Scope

- This is a phone-first collaborative planning app for a family cabin trip:
  - Trip window: July 2-6, 2026
  - Location context: Arnold, California
- The app coordinates:
  - Meals
  - Supplies
  - Family check-ins
  - Activity votes
  - Shared list updates across multiple devices
- It is designed to be deployed as a managed public website/PWA with a normal HTTPS URL. Local same-Wi-Fi use remains available for preview/testing through the LAN URL printed by the server.

## 2) Front-End Structure (UI/UX)

- Layout:
  - Fixed left sidebar with navigation and trip date card
  - Main content with panel-based screens
  - Mobile bottom nav for Status, Meals, Supplies
  - Drawer-style overlays for check-in and add-item actions
- Screens:
  - **Status (dashboard)**: trip status metrics, family picker, top-needed action list
  - **People**: family cards, check-in context, questions and kid-safe food chips
  - **Meals**: open meals list + full meal board by day
  - **Supplies**: still-needed supplies list + cold storage map
  - **Cabin**: static cabin details and gear checklist
  - **Ideas**: activity list with voting controls
- Interactive patterns:
  - Clicking family/claim/vote buttons updates UI and state
  - Check-in opens a 4-step drawer
  - Add meal idea / Add supply opens item drawer
  - Share button for trip URL (navigator share / clipboard fallback)
  - Toast notifications for success/error feedback
- Sync status badge updates between:
  - `Connecting`
  - `Live sync`
  - `Offline`
  - `Reconnecting`

## 3) Application Data Model

### Primary state shape
- `version`: number
- `updatedAt`: ISO timestamp
- `meals`: array
- `supplies`: array
- `familyChecks`: object keyed by family id
- `familyResponses`: object keyed by family id
- `activityVotes`: object keyed by activity id
- `activityVoters`: object keyed by activity id, then family id, for one current vote per family

### Family model
- Valid family IDs are fixed in both client and server:
  - `shell`
  - `nick`
  - `nat`
  - `bear`
- Family metadata includes:
  - display name
  - short name
  - color
  - check-in status text
  - helper details (pre-check-in placeholder info)

### Attendee model
- The auth UI includes 13 named attendee choices:
  - Michelle / Shell
  - Nick
  - Marissa
  - Luca
  - Sophia
  - Rocco
  - Gio
  - Bear
  - Jessica
  - Andy
  - Natalie
  - Oli
  - Viv
- Each attendee maps to a fixed family/household.
- The selected attendee is submitted as `personId` during profile creation/resume.

### Meal object
- Fields:
  - `id` (string)
  - `day` (`fri | sat | sun | mon`)
  - `dayLabel` (string label for UI)
  - `type` (Breakfast / Lunch / Dinner / Dessert / Pack-up etc.)
  - `time` (time window or “Flexible”)
  - `owner` (family id or empty string)
  - `idea` (text)
  - `kids` (kid-friendly backup text)
  - `cold` (string array of fridge-relevant items)

### Supply object
- Fields:
  - `id`
  - `name`
  - `qty`
  - `type` (`dry goods`, `cold`, or `gear`)
  - `owner` (family id or empty string)

### Family response object
- Stored at `familyResponses[familyId]`:
  - `arrival`
  - `leaving`
  - `kidFood`
  - `allergies`
  - `gear` (array of selected gear items)
  - `updatedAt` (timestamp)

### Activity object
- Hardcoded catalog with fixed ids:
  - `white-pines`
  - `big-trees`
  - `logging`
  - `lake-alpine`
  - `big-trees-market`
  - `bear-valley`
- Votes stored in `activityVotes`

## 4) Startup and Persistence

### Local storage (browser)
- App bootstraps from `localStorage` if valid:
  - `cabin-game-plan-v1` (meals/supplies state fallback)
  - `cabin-game-plan-selected-family-v1` (selected family)
  - `cabin-game-plan-passcode-v1` (passcode persistence)
  - `cabin-game-plan-client-id-v1` (stable client identity)
- If no usable local state exists:
  - starts from embedded defaults in `script.js`
- Shared server state always replaces local state when successfully fetched.

### Server persistence
- Server keeps `sharedState` in memory and writes to disk:
  - target state file: `data/cabin-state.json` (or `${DATA_DIR}/cabin-state.json`)
- On startup:
  - create `DATA_DIR` as needed
  - prefer existing persisted state file
  - fallback to seed state
- Seed loading order:
  - `${DATA_DIR}/seed-state.json` if exists
  - fallback to `data/seed-state.json` in repo

### Normalization and defaults
- Missing/invalid values are normalized before state is applied.
- Family IDs are validated.
- Meal/supply arrays are required arrays.
- Votes are objects; if invalid, defaults are applied.

## 5) Authentication and Access Control

- Optional `APP_PASSCODE` applies to all API endpoints:
  - `/api/state`
  - `/api/action`
  - `/api/events`
- Client may send passcode:
  - HTTP header `x-cabin-passcode`
  - query param `passcode` for one-time/legacy entry links, after which the visible URL is cleaned
  - HttpOnly cookie after successful invite-code validation
- Valid passcode is accepted and stored in an HttpOnly cookie:
  - cookie name: `cabin_trip_auth`
- Two modes:
  - user passcode (normal)
  - admin passcode (`APP_ADMIN_PASSCODE` if defined, else same as `APP_PASSCODE`)
- Unauthorized returns:
  - `401` JSON `{ ok:false, needsPasscode:true, message:"Passcode required." }`

## 6) API Contracts

### `GET /api/state`
- Requires auth if passcode is configured.
- Response:
  - `200` with `{ state }`

### `POST /api/action`
- Requires auth.
- Request body:
  - `{ type, payload, clientId }`
- Dispatches action server-side and returns:
  - `200` with `{ changed, message, state }` for success
  - `409` for invalid/non-state-changing operations
  - `400` for malformed body
- Broadcasts state to SSE clients when changed.

#### Action types
- `claimMeal`
  - payload: `{ id, owner }`
  - requires valid meal and owner
  - blocks if already claimed by someone else
- `toggleSupply`
  - payload: `{ id, owner }`
  - owner can claim an open item or unclaim their own claimed item
  - blocks if claimed by another family
- `voteActivity`
  - payload: `{ id }`
  - validates the activity id against the known activity catalog
  - toggles the signed-in family's vote for that activity
- `checkin`
  - payload includes `familyId`, `arrival`, `leaving`, `kidFood`, `allergies`, `gear[]`
  - sets `familyChecks[familyId]=true`
  - records/overwrites `familyResponses[familyId]`
- `addMealIdea`
  - payload: `{ day, type, idea, kids }`
  - adds meal with `owner:""`, `time:"Flexible"`, fresh `meal-${Date.now()}`
- `addSupply`
  - payload: `{ name, qty, type }`
  - type constrained to `dry goods | cold | gear`
  - adds item with `owner:""` and fresh `supply-${Date.now()}`
- `reset`
  - admin-only
  - loads seed state and replaces board state

### `GET /api/events`
- SSE endpoint
- Requires auth
- Sends:
  - immediate `state` event with full current state
- Client subscribes and updates UI on each `state` event

### Static file serving
- Any `GET`/`HEAD` falls back to static serving from repo root
- Path traversal is blocked by canonical path checks

## 7) Sync Model

- On app load:
  1. Initialize from local state
  2. Attempt `/api/state`
  3. If successful, replace local state and set `api.hasLoadedSharedState=true`
  4. Open SSE via `/api/events`
- On action:
  - when online, POST to `/api/action`
  - on success, server returns updated state; UI applies it
  - on 401/403, prompts for passcode and retries
  - on HTTP/HTTPS network failure, does not mutate local shared state and shows a reconnect message
  - on non-HTTP local file usage only, falls back to local mutate + localStorage
- SSE event parse failures set sync status to offline.

## 8) UI Interaction Rules

- Family picker:
  - A family must be selected before claiming meal/supply
  - After profile login, the picker is locked to the signed-in profile's family
- Claiming:
  - Meal claim: toggle by the signed-in owner family for claim/unclaim
  - Supply claim: toggle by the signed-in owner family for claim/unclaim
- Check-in drawer:
  - opens from People view and status quick actions
  - 4-step flow:
    1. select family
    2. arrival/leaving
    3. food + allergies
    4. gear checkboxes
- Add item drawer:
  - meal mode: day/type/idea/kid backup
  - supply mode: name/qty/type
  - closes on submit/cancel

## 9) Derived UI Metrics

- The dashboard updates derived counts each render:
  - claimed meals
  - claimed supplies
  - open meals
  - open supplies
  - missing check-ins
  - cold assignment summary (`#coldCount`, percentage meter)
- “Top needed” list is built from:
  - family selection requirement
  - missing check-in for selected family
  - open meals
  - open supplies
  - up to two missing-checkin entries for other families
- Capped/filtered lists:
  - top-needed uses first nine computed items

## 10) Offline/Local Behavior

- On non-HTTP protocols, app disables sync and shows local-only mode.
- For HTTP/HTTPS offline failures during action:
  - local shared-state mutation is blocked
  - the sync badge moves to sync error
  - user is told to reconnect and try again
- For non-HTTP local file usage:
  - local mutation still occurs as a non-shared fallback
  - local storage is updated so user has continuity on that device

## 11) PWA and Service Worker

- Manifest defines installable web-app metadata and theme/icon.
- Service worker:
  - cache-first for shell assets
  - runtime network fallback + cache population
  - stale-cache cleanup on activate
- Note: caching behavior supports repeat use but app logic still depends on server for full collaborative mode.

## 12) Commands

### Run
- `npm start` (also alias `npm run dev`)
- Server listens on:
  - `http://localhost:8000`
  - plus any discovered local IPv4 addresses

### Reset behavior
- Runtime admin reset action available through API action `reset` with admin passcode
- Documented legacy local reset method:
  - stop server
  - remove `data/cabin-state.json`
  - restart server

## 13) Files of Interest

- `README.md`: quick-start and purpose summary
- `server.js`: API, auth, persistence, SSE, static server, action handlers
- `script.js`: app logic, rendering, sync, drawers, forms, actions
- `index.html`: all screens and control markup
- `styles.css`: responsive mobile/desktop layout and component styles
- `service-worker.js`: offline cache handling
- `manifest.webmanifest`: install metadata
- `data/seed-state.json`: initial canonical seed data
- `data/cabin-state.json`: live saved state (if present)

## 14) Important Edge Cases / Behavior Notes

- Server ignores invalid family IDs and day values via server-side validators.
- Activity votes are a signed-in family toggle; each family can add or remove one current vote per activity.
- Duplicate claim attempts are prevented when another family owns the item.
- Check-in data is overwriteable per family by subsequent submissions.
- Reset is intentionally admin-gated but still updates everyone via SSE when successful.
- Query parameter passcode is removed from browser URL after initial load when present.

## 15) Current Known Gaps

- Some render selectors are referenced but not present in HTML:
  - `#mealPreview`
  - `#activityPreview`
  - `#mealClaimedCount`
  - `#supplyClaimedCount`
  - `#coldCount`, `#coldMeter`
  - `.day-tabs`
- Static UI structure and script should still function for primary flows despite these dangling targets.
