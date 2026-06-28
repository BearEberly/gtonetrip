# Cabin Game Plan - Complete Product Brief, Build Log, and Handoff Document

**Project:** Cabin Game Plan  
**Project folder:** `/Users/bearbear/Documents/Codex/2026-06-13/i-need-to-speak-a-spreadsheet`  
**Primary local URL:** `http://localhost:8000/`  
**Document created:** 2026-06-16  
**Document purpose:** This file captures, in one place, exactly what has been built so far, what the user has been asking for, what the app is supposed to become, how the current implementation behaves, what has been verified, and what remains unfinished or risky.

## Current Update - June 28, 2026

The user's preferred direction remains a normal public website URL, but the backend architecture has changed.

Current implementation status:

- The app frontend is now intended to be served as a static site from Cloudflare Pages.
- Shared board APIs now live in a Supabase Edge Function named `trip-api`.
- Shared board state and simple session tokens are stored in Supabase Postgres.
- Static-only hosting is now sufficient for the frontend because the shared backend moved out of the repo server and into Supabase.
- The exact cabin address is not hardcoded in the public HTML shell. It is hidden behind sign-in-oriented copy.
- The public app uses a profile login layer: trip invite code, tap-your-name attendee picker, first name, email, family/household, optional password, and optional Apple passkey / Face ID / Touch ID.
- The attendee picker includes Michelle/Shell, Nick, Marissa, Luca, Sophia, Rocco, Gio, Bear, Jessica, Andy, Natalie, Oli, and Viv. Picking a person pre-fills first name and household.
- Profiles store optional `personId`, so multiple named people can share a family email while staying distinct profiles.
- Existing password-protected profiles require the password before profile details can change.
- Existing passwordless profiles can be resumed only under their already assigned family from a fresh unauthenticated session; a fresh session cannot move an existing email to another household.
- Active profile sessions can update their own first name/family, and verified password profiles can update their profile details through the continue flow.
- Passkey registration and sign-in require WebAuthn user verification, aligning the copy with Face ID, Touch ID, or device passcode behavior on supported Apple devices.
- `NODE_ENV=production` with no `APP_PASSCODE` fails closed, so a public deployment cannot accidentally expose the shared board with a blank invite code.
- Claims and check-ins derive ownership from the signed-in profile's family rather than trusting the client payload.
- Family pickers now show the signed-in profile family as locked, with sign-out required to switch households.
- `/api/me` returns the current profile plus a profile count instead of exposing every saved profile email to anyone with the invite code.
- EventSource now uses cookies; the passcode is no longer sent in the live-sync URL.
- Shared Shell/cabin checklist controls are real persisted controls, not temporary checkboxes.
- Meal claims can be undone by the signed-in family that owns the meal.
- User-added meal ideas and supply items can be edited or deleted only by the creating or owning family; protected starter rows remain intact.
- Activity votes are now one current vote per signed-in family per activity, with the same tap used to remove the family vote.
- The server rejects unknown activity IDs instead of accepting arbitrary vote keys.
- The dashboard now shows a dismissible install panel after login when the app is not already running from the Home Screen.
- iPhone Safari users get the Share -> Add to Home Screen path in-app; browsers with native PWA install support use the captured install prompt.
- The service worker cache is now `cabin-game-plan-v11` and supports an update-ready control for a waiting app shell.
- HTTP/HTTPS shared writes no longer fall back to local-only mutation when the API is unreachable; users are told to reconnect and try again so one phone cannot silently diverge from the shared board.
- Local same-Wi-Fi use remains useful for testing, but the preferred sharing model is a hosted HTTPS URL that family can add to the iPhone Home Screen.

The historical sections below are still useful context, but older statements that describe the app as only a same-Wi-Fi prototype should be read as past state, not the current target.

## 1. Executive Summary

Cabin Game Plan is a small, phone-first collaborative family trip planning app for a cabin trip in Arnold, California from July 2 through July 6, 2026.

The core job of the app is to let multiple family members coordinate trip responsibilities without using a messy spreadsheet or group text thread. The app should show everyone the same live board so they can see which meals are covered, which supplies still need to be claimed, who has checked in, and which activities are most popular.

The current app is implemented as a simple static front end plus a Node.js server. The preferred target is now a managed public website/PWA: a paid host runs the Node service, provides the HTTPS URL, and stores live state on persistent disk. Local same-Wi-Fi mode remains useful for previewing and testing, but the family should use the hosted URL once deployment is complete.

The app currently has working shared sync for:

- Meal claims
- Supply claims and unclaims
- Family check-ins
- Activity votes
- Added meal ideas
- Added supply items
- Shared state loading and persistence
- Optional passcode authentication
- Admin reset behavior

The app is not yet publicly deployed or verified on a real iPhone Home Screen install. The Render deployment files are present, and the remaining work is deployment, public URL verification, and any final organizer/admin polish the user wants before sharing the link.

## 2. What The User Is Looking For

The user is looking for an actual working app, not just a mockup, not just a visual preview, and not just a written plan.

Based on the conversation and the app that has been built, the user wants:

- A real app that can be opened in a browser.
- A useful app for a specific family cabin trip.
- A phone-friendly experience.
- A simple way for each household/family unit to say what they are bringing or handling.
- A live shared board so everyone sees the same assignments.
- A replacement for a spreadsheet-style planning workflow.
- A simple enough interface that family members can use it without training.
- A local preview that works in the Codex in-app browser.
- A server that does not randomly fail during preview.
- A durable written record of exactly what the app is supposed to do.
- A handoff-quality Markdown file that another thread, model, or developer can read to get fully up to speed.
- A clear distinction between what has already been implemented and what still needs to be done.

The deeper product desire is:

> Make planning the cabin weekend feel obvious, shared, and low-friction. Nobody should need to ask "who is bringing plates?" or "who is handling Saturday lunch?" because the app should make that visible immediately.

The app should be optimized for family coordination, not for abstract project management. It should be friendly, lightweight, visual, and fast to tap through on a phone.

## 3. Conversation History And User Requests

This section records the visible request flow that led to the current app state.

### 3.1 User brought over previous chat context

The user provided:

- Project path: `/Users/bearbear/Documents/Codex/2026-06-13/i-need-to-speak-a-spreadsheet`
- Thread ID: `019ec390-ac81-7fe1-abe8-d4be36d10881`
- Codex thread URL: `codex://threads/019ec390-ac81-7fe1-abe8-d4be36d10881`

The user said the previous chat ran out of room and asked Codex to review everything and get up to speed.

### 3.2 User asked to retry preview

The user had the in-app browser open at:

- `http://localhost:8000/`

They asked:

- "Let's try the preview again."

The work in response focused on getting the local app running and verifying that it answered through the browser/server.

### 3.3 User asked for four different agents/opinions

The user said:

- "All right, I want you to implement four different agents and figure out how to turn this into an actual working app. Get four different opinions of how to get this done."

What this means for the app:

- The user wanted more than one implementation perspective.
- The user wanted the app converted from idea/preview into an actual working tool.
- The user wanted confidence that the approach was sound.
- This document should preserve that intent as a future planning input.

What was actually done in the visible continuation:

- The current codebase was inspected.
- The server and live sync behavior were audited.
- A concrete server bug was found and fixed.
- The local preview was verified.
- A first version of the full specification was created.

No separate "four agent" source files are currently present in the repository. If this is important in the next stage, the natural implementation would be to create four explicit planning viewpoints:

- Product agent: user workflows and family planning needs.
- Frontend agent: mobile usability, layout, accessibility, and visual polish.
- Backend/sync agent: persistence, conflict handling, auth, LAN/public hosting.
- QA/release agent: preview stability, browser testing, deployment readiness.

### 3.4 App quit and user reopened it

The user said the app quit on its own and they reopened it, then asked to try again.

The important implication:

- Stability matters.
- The preview needs to be recoverable after Codex/app restarts.
- The server process and local preview need to be easy to restart and verify.

### 3.5 User asked for a full Markdown description

The user asked:

- "Write a full MD of exactly what the app is supposed to do. Do not leave out any details. Give a full description MD of everything the app is supposed to do."

In response, a spec was written:

- `cabin-game-plan-full-spec.md`

That first spec captured:

- purpose and scope
- front-end structure
- data model
- persistence
- authentication
- API contracts
- sync model
- UI interaction rules
- PWA/service worker details
- known gaps

### 3.6 User asked to make it an MD file

The user then clarified:

- "Please make this an MD file."

The previous response created:

- `/Users/bearbear/Documents/Codex/2026-06-13/i-need-to-speak-a-spreadsheet/cabin-game-plan-full-spec.md`

That file has 322 lines.

### 3.7 Current request

The user now asks:

- "Give me a full and 100% detailed MD file. Make me the MD file of exactly what has been done and exactly what the user is looking for out of the app. Make it as long as it can possibly be with as much information as possible."

This file is the response to that request.

## 4. Current Verified Runtime State

As of this document creation pass:

- `http://localhost:8000/` returned `HTTP/1.1 200 OK`.
- `http://localhost:8000/api/state` returned JSON state.
- A `node server.js` process was running.
- Process observed:
  - PID: `42071`
  - Command: `node server.js`
- `/api/state` returned:
  - `version`: `6`
  - `updatedAt`: `2026-06-16T04:50:18.944Z`
- Current app preview URL in the in-app browser:
  - `http://localhost:8000/`

## 5. Current Repository File Inventory

Current project files:

- `README.md`
- `index.html`
- `styles.css`
- `script.js`
- `server.js`
- `package.json`
- `manifest.webmanifest`
- `service-worker.js`
- `cabin-game-plan-full-spec.md`
- `CABIN_GAME_PLAN_COMPLETE_PRODUCT_BRIEF.md` (this file)
- `assets/favicon.svg`
- `assets/cabin-hero.png`
- `data/seed-state.json`
- `data/cabin-state.json`

Important note:

- The shell `cwd` shown by the environment was `/Users/bearbear/Documents/Guantones app`, but that folder only contained `.git` during inspection.
- The actual app files are in `/Users/bearbear/Documents/Work - Label Files/Folders/Guantones app`.

## 6. Current App Name And Identity

App name:

- Cabin Game Plan

Manifest short name:

- Cabin Plan

Package name:

- `cabin-game-plan`

Browser title:

- Cabin Game Plan

HTML meta description:

- "Fourth of July cabin trip planner for family meals, supplies, activities, and check-in."

PWA manifest description:

- "July 4 cabin trip planner for meals, supplies, and check-ins."

Primary visual identity:

- Mountain/cabin themed hero image: `assets/cabin-hero.png`
- SVG favicon: `assets/favicon.svg`
- Forest/lake/ember color palette in CSS variables

## 7. The App's Product Job

The app exists to answer these practical questions:

- Who is coming?
- Has each family checked in?
- When is each family arriving?
- When is each family leaving?
- What will the kids reliably eat?
- Are there allergies or hard-no foods?
- Who is claiming each meal slot?
- Which meals still need an owner?
- What is each meal idea?
- What kid backup exists for each meal?
- Which ingredients require fridge/cooler space?
- Which supplies are already claimed?
- Which supplies still need to be claimed?
- Which items are cold storage items?
- Which shared gear is coming?
- What cabin information is known?
- What cabin information is still missing?
- Which activities look most appealing?
- What activities are near Arnold?
- What errands/grocery backup options exist?

The app should let people answer these without needing the organizer to manually update everyone.

## 8. Target Users

### 8.1 Primary user

The trip organizer.

The organizer needs:

- quick visibility into open responsibilities
- a list of missing check-ins
- a way to avoid duplicate food/supply purchases
- a single link to share
- a lower-friction replacement for texting everyone individually

### 8.2 Secondary users

Family households:

- Shell
- Nick & Riss
- Nat & Andy
- J & Bear

Each family needs:

- to select their household
- claim what they are bringing
- check in once
- vote on activities
- see what others already claimed
- avoid accidentally taking over someone else's item

### 8.3 Device expectations

The app is phone-first.

Expected usage:

- Family opens the hosted HTTPS URL on iPhone Safari.
- Family can add the website to the iPhone Home Screen as a PWA.
- The paid host runs the Node service; the user does not need to keep a Mac server running.
- Local LAN URLs printed by the server remain available for preview/testing only.

Desktop also works, but the interface should remain practical on mobile.

## 9. Current Technical Stack

The current app is intentionally small:

- No React
- No build step
- No database dependency
- No external packages
- Plain Node.js HTTP server
- Plain JavaScript front end
- HTML/CSS/JS served directly
- JSON file persistence
- Server-sent events for live updates
- Local storage fallback
- Service worker cache for shell assets

This makes it easy to run locally with:

```bash
npm start
```

or:

```bash
npm run dev
```

Both commands map to:

```bash
node server.js
```

## 10. What Has Been Built So Far

### 10.1 Local Node server

Implemented in:

- `server.js`

The server:

- serves static files
- listens on `0.0.0.0`
- defaults to port `8000`
- can use custom port through `PORT`
- prints local URLs when started
- discovers non-internal IPv4 LAN addresses
- exposes `/api/state`
- exposes `/api/action`
- exposes `/api/events`
- persists shared state to JSON
- broadcasts state changes over SSE
- optionally gates API routes with passcode auth

### 10.2 Static app shell

Implemented in:

- `index.html`
- `styles.css`
- `script.js`

The front end includes:

- sidebar nav
- dashboard hero
- trip status counters
- family picker
- top-needed panel
- people/check-in panel
- meals panel
- supplies panel
- cabin info panel
- activities panel
- check-in drawer
- add item drawer
- toast region
- mobile bottom nav

### 10.3 Live shared state

Implemented through:

- `GET /api/state`
- `POST /api/action`
- `GET /api/events`
- `data/cabin-state.json`

The app now supports shared edits for all primary mutable entities:

- claims
- votes
- check-ins
- new meals
- new supplies

### 10.4 Local fallback state

Implemented in:

- `script.js`

The app uses local storage if shared server state is unavailable.

Local storage keys:

- `cabin-game-plan-v1`
- `cabin-game-plan-selected-family-v1`
- `cabin-game-plan-client-id-v1`
- `cabin-game-plan-passcode-v1`

### 10.5 Optional passcode support

Implemented in:

- `server.js`
- `script.js`

Passcode behavior:

- Server only requires passcode if `APP_PASSCODE` is configured.
- Client prompts for "Enter trip passcode" when API returns unauthorized.
- Passcode can be sent by header or query parameter.
- Query parameter passcode is removed from the browser URL after capture.
- Auth cookie is HttpOnly and Strict SameSite.

### 10.6 Admin reset

Implemented in:

- `server.js`

Reset action:

- type: `reset`
- admin-only
- reloads seed state
- normalizes state
- persists
- broadcasts to SSE clients

### 10.7 Reset edge-case fix

A concrete server bug was fixed:

Problem:

- If `DATA_DIR` was configured and did not contain `seed-state.json`, the `reset` action could fail because reset tried to read the data-dir seed directly instead of using the same fallback logic as startup.

Fix:

- Added `loadSeedState()`
- Startup and reset now both use seed fallback logic:
  - try data-dir seed
  - fallback to bundled repo seed

Files changed:

- `server.js`

Validation performed:

- `node --check server.js`
- API state endpoint check
- action endpoint checks
- reset behavior check with admin passcode
- SSE initial stream check
- browser/server preview check

### 10.8 PWA shell support

Implemented in:

- `manifest.webmanifest`
- `service-worker.js`

PWA behavior:

- standalone display
- app theme color
- favicon/app icon
- service worker caches shell assets
- cache-first fetch for same-origin GET requests

### 10.9 Documentation

Existing documentation:

- `README.md`
- `cabin-game-plan-full-spec.md`
- this file

README currently covers:

- what app is
- how to run
- how to share LAN link
- what syncs live
- how to reset board by deleting state file
- current public website/PWA scope and local preview mode
- note about public hosting for off-Wi-Fi use

`cabin-game-plan-full-spec.md` covers:

- app purpose
- data model
- API contract
- sync behavior
- auth behavior
- UI behavior
- known gaps

This file adds:

- detailed user intent
- build log
- current state
- handoff notes
- future implementation direction

## 11. Files And Responsibilities

### 11.1 `server.js`

Main backend/server file.

Responsibilities:

- create HTTP server
- resolve root directory
- resolve data directory
- load persisted state
- load seed state
- normalize state
- persist state
- serve static files
- guard against path traversal
- parse request bodies
- handle API auth
- create signed auth tokens
- set auth cookies
- compare auth tokens safely
- handle live event stream clients
- broadcast state changes
- apply all supported actions
- print local server URLs

Important constants:

- `rootDir`
- `dataDir`
- `bundledSeedPath`
- `seedPath`
- `statePath`
- `port`
- `APP_PASSCODE`
- `APP_ADMIN_PASSCODE`
- `SESSION_SECRET`
- `AUTH_HEADER`
- `AUTH_COOKIE_NAME`
- `AUTH_COOKIE_TTL`

Important functions:

- `createAuthSignature`
- `loadJsonSafely`
- `loadSeedState`
- `loadState`
- `normalizeState`
- `persistState`
- `sendJson`
- `sendUnauthorized`
- `readRequestBody`
- `broadcastState`
- `touchState`
- `familySafe`
- `textSafe`
- `daySafe`
- `dayLabelFor`
- `supplyTypeSafe`
- `getProvidedPasscode`
- `isTokenMatch`
- `parseCookie`
- `setAuthCookie`
- `ensureApiAuth`
- `applyAction`
- `handleAction`
- `handleEvents`
- `safeStaticPath`
- `serveStatic`
- `localAddresses`

### 11.2 `script.js`

Main client application file.

Responsibilities:

- define icon SVGs
- define family list
- define default meal list
- define default supply list
- define activity catalog
- define local storage keys
- load selected family
- load auth passcode
- load local state
- normalize server state
- fetch shared state
- connect to SSE stream
- perform server actions
- block failed HTTP/HTTPS shared writes instead of creating local-only divergence
- support local-only fallback only for non-HTTP file usage
- render families
- render meal board
- render open meals
- render supplies
- render top-needed list
- render activity grid
- update counts
- bind all click handlers
- open and close drawers
- submit check-in
- submit add-item form
- register service worker

Important client state:

- `state`
- `selectedDay`
- `selectedFamily`
- `authPasscode`
- `drawerStep`
- `lastFocusedElement`
- `itemMode`
- `api.clientId`
- `api.eventSource`
- `api.hasLoadedSharedState`

### 11.3 `index.html`

Main markup.

Responsibilities:

- define document metadata
- load manifest
- load CSS
- provide app shell
- provide nav controls
- provide all panels
- provide drawers
- provide toast region
- load `script.js`

Key UI containers:

- `#dashboard`
- `#checkin`
- `#food`
- `#supplies`
- `#cabin`
- `#activities`
- `#syncStatus`
- `#shareLink`
- `#quickFamilyPicker`
- `#topNeeded`
- `#familiesGrid`
- `#openMealList`
- `#mealBoard`
- `#supplyList`
- `#activityGrid`
- `#checkinDrawer`
- `#itemDrawer`
- `#toast`

### 11.4 `styles.css`

Main visual styling.

Responsibilities:

- root CSS variables
- responsive shell layout
- sidebar
- hero media
- dashboard status cards
- board panels
- family picker
- meals board
- supply layout
- activities grid
- drawers
- toast
- mobile nav
- responsive behavior

Important design characteristics:

- Apple/system font stack
- forest/lake/ember palette
- 8px-ish radius design language
- phone-first usability
- large tap targets
- explicit mobile nav

### 11.5 `README.md`

Quick-start project documentation.

Responsibilities:

- explain purpose
- explain `npm start`
- explain localhost and LAN URLs
- explain live sync
- explain state file
- explain simple reset method
- define current public website/PWA scope and local preview mode

### 11.6 `service-worker.js`

PWA/offline shell cache.

Responsibilities:

- create cache named `cabin-game-plan-v10`
- cache app shell URLs on install
- clear stale caches on activate
- return cached GET responses when available
- fetch and cache successful same-origin GET responses

### 11.7 `manifest.webmanifest`

Installable app metadata.

Responsibilities:

- name and short name
- start URL
- standalone display mode
- background color
- theme color
- description
- icons

### 11.8 `data/seed-state.json`

Starter state file.

Responsibilities:

- provide default trip meals
- provide default supplies
- provide initial family checks
- provide initial activity vote counts

### 11.9 `data/cabin-state.json`

Current persisted live state.

Responsibilities:

- preserve actual shared board edits
- loaded before seed state on startup
- overwritten on each successful state-changing server action

## 12. Current UI Screens In Detail

### 12.1 Status / Dashboard

Route/panel id:

- `dashboard`

Purpose:

- Give family members the fastest possible view of trip planning status.
- Let the user pick their family before claiming anything.
- Surface the next most important actions.

Contains:

- hero image
- app title
- trip dates
- placeholder cabin address
- sync status badge
- share link button
- open meal count
- open supply count
- missing check-in count
- signed-in family panel / locked family picker
- "Needs doing" list

Status buttons:

- Open meals button jumps to Meals panel.
- Open items button jumps to Supplies panel.
- Missing check-ins button jumps to People panel.

Family picker:

- Buttons for Shell, Nick, Nat, Bear.
- Selected family is highlighted.
- Selection is saved in browser local storage.

Needs doing list:

- If no family selected, first item asks user to pick family.
- If selected family has not checked in, surfaces that family check-in.
- Then includes open meals.
- Then includes open supplies.
- Then includes missing check-ins for other families.
- Shows up to 9 items.

### 12.2 People / Family Check-in

Route/panel id:

- `checkin`

Purpose:

- Show who has checked in.
- Let each family provide planning details.
- Keep the organizer aware of missing details.

Contains:

- Family check-in header
- "Open check-in" button
- family cards
- questions for Shel
- kid-safe food chips

Family cards show:

- family color bar
- family name
- family details
- submitted arrival/leaving if available
- submitted kid food if available
- checked-in status

Questions for Shel currently shown as static checklist:

- Exact cabin address
- Lake name nearby
- Refrigerator and freezer space
- Grill, oven, Blackstone, or fire pit
- Checkout time Monday

Kid-safe foods currently shown:

- Butter pasta
- Chicken nuggets
- Burgers
- Hot dogs
- Fruit
- Pancakes
- Rice crispy treats
- S'mores

Important limitation:

- The static checkbox lists in this panel do not currently persist. They are UI-only browser checkboxes.

### 12.3 Meals

Route/panel id:

- `food`

Purpose:

- Assign meal ownership.
- Avoid unclaimed meal slots.
- Record meal ideas and kid backups.
- Track cold/fridge-related meal ingredients.

Contains:

- header
- Add meal idea button
- Open meals panel
- Full meal board grouped by day

Meal rows show:

- meal type
- idea
- time
- kid backup
- cold ingredients, or "No fridge space"
- owner pill if claimed
- claim button if open

Claim behavior:

- User must select family first.
- User can claim open meal.
- User cannot claim a meal already owned by another family.
- Current implementation does not include an unclaim meal button in UI.

Add meal idea behavior:

- Opens item drawer in meal mode.
- User chooses:
  - day
  - meal type
  - idea
  - kid backup
- New meal defaults:
  - `time`: `Flexible`
  - `owner`: empty string
  - `cold`: empty array

### 12.4 Supplies

Route/panel id:

- `supplies`

Purpose:

- Track shared trip supplies.
- Let people claim items.
- Prevent duplicate purchases.
- Keep cold storage in mind.

Contains:

- header
- Add item button
- supply list
- cold storage map

Supply rows show:

- type
- item name
- quantity/notes
- owner if claimed
- claim/unclaim/claimed button

Supply behavior:

- User must select family first.
- User can claim an open supply.
- User can unclaim a supply they own.
- User cannot claim or unclaim another family's supply.
- Claimed-by-another-family button is disabled.

Cold storage map:

- Top shelf: Milk, seltzers, lemonade
- Middle shelf: Eggs, bacon, breakfast sausage
- Bottom shelf: Meat for assigned dinners
- Cooler 1: Drinks and ice only
- Cooler 2: Raw meat, wrapped
- Pantry: Dry goods, plates, s'mores

Important limitation:

- The cold storage map is static. It does not automatically reorganize based on claims.

### 12.5 Cabin Info

Route/panel id:

- `cabin`

Purpose:

- Store cabin logistics in a single view.
- Keep placeholder information visible until confirmed.

Current visible cabin details:

- Address: `1234 Pine Ridge Road, Arnold, CA`
- Door code: `TBD`
- Wi-Fi: `TBD`
- Checkout: `Monday July 6 - time TBD`
- Cell service: `Confirm at cabin`

Gear checklist currently shown as static checkbox list:

- Portable pizza oven tested
- Portable Blackstone tested
- Solo Stove or fire pit confirmed
- Propane and lighter packed
- Baseball gloves, puzzles, kid games

Important limitation:

- Cabin details are hardcoded in HTML.
- Gear checklist checkboxes are UI-only and do not persist.

### 12.6 Activities / Ideas

Route/panel id:

- `activities`

Purpose:

- Let family vote on activity ideas.
- Capture nearby Arnold options.
- Make activity preferences visible.

Activities shown:

- White Pines Lake
- Calaveras Big Trees
- Logging Museum + Rim Trail
- Lake Alpine
- Big Trees Market
- Bear Valley Adventure Co.

Activity card shows:

- icon
- name
- notes
- tags
- vote button with count and Vote / Remove vote state

Vote behavior:

- Clicking Vote adds the signed-in family's one current vote.
- Clicking Remove vote removes that signed-in family's vote.
- Baseline numeric vote totals remain visible, and new family votes are added on top.
- A family cannot repeatedly inflate a vote count by tapping the same activity.

## 13. Current Default Family Data

### Shell

- id: `shell`
- display name: `Shell`
- short name: `Shell`
- color: `#d9512b`
- starting status: `Needs check-in`
- details: `Possible Thursday arrival - address source`

### Nick & Riss

- id: `nick`
- display name: `Nick & Riss`
- short name: `Nick`
- color: `#b37224`
- starting status: `Partial`
- details: `Kids food preferences needed`

### Nat & Andy

- id: `nat`
- display name: `Nat & Andy`
- short name: `Nat`
- color: `#167fa6`
- starting status: `Partial`
- details: `Meal ideas started`

### J & Bear

- id: `bear`
- display name: `J & Bear`
- short name: `Bear`
- color: `#5a9f3c`
- starting status: `Checked in`
- details: `Gear list started`

## 14. Current Meal Ownership Source

As of June 27, 2026, all meal ownership statements from before June 27, 2026 are invalid and should not be used.

Only these current meal ownership facts are valid:

- `fri-dinner`
  - owner: `bear`
  - source: today's user note that Jessica and Bear / Jear are bringing steaks and possibly other meats.
- `fri-dessert`
  - owner: `nick`
  - source: today's user note that Nick and Marissa / G6 are bringing s'mores.

Every other meal slot is intentionally open until the user gives new information.

## 15. Current Supply Ownership Source

As of June 27, 2026, all supply ownership statements from before June 27, 2026 are invalid and should not be used.

Only these current supply and gear ownership facts are valid:

- `smores`
  - owner: `nick`
  - note: G6 is bringing s'mores.
- `eggs`
  - owner: `bear`
  - note: Jear is bringing eggs.
- `steaks`
  - owner: `bear`
  - note: Jear is bringing steaks.
- `other-meats`
  - owner: `bear`
  - note: Jear may bring other meats.
- `hot-dogs-buns`
  - owner: `bear`
  - note: Jear is getting hot dogs and buns.
- `blackstone-two-burner`
  - owner: `bear`
  - note: Bear can bring the smaller two-burner Blackstone.
- `cranium`
  - owner: `bear`
  - note: Jear has Cranium.
- `charades`
  - owner: `nat`
  - note: the Riggs want to bring charades.

All other supplies are intentionally open unless the user provides new information.

## 16. Current Activity Catalog

### White Pines Lake

- id: `white-pines`
- notes: `Beach, picnic, playground, disc golf`
- tags:
  - `kid-friendly`
  - `low effort`
  - `address needed`
- seed votes: `3`
- current observed votes: `5`

### Calaveras Big Trees

- id: `big-trees`
- notes: `Giant sequoias, visitor center, easy North Grove loop`
- tags:
  - `must-do`
  - `shade`
  - `4 mi from Arnold`
- seed votes: `4`
- current observed votes: `6`

### Logging Museum + Rim Trail

- id: `logging`
- notes: `Museum, lake add-on, first mile of trail is easier`
- tags:
  - `short outing`
  - `backup`
- seed votes: `2`
- current observed votes: `2`

### Lake Alpine

- id: `lake-alpine`
- notes: `Bigger alpine lake, boating, hiking, longer drive`
- tags:
  - `day trip`
  - `verify distance`
- seed votes: `2`
- current observed votes: `2`

### Big Trees Market

- id: `big-trees-market`
- notes: `Backup groceries, ice, sandwiches, forgotten staples`
- tags:
  - `food`
  - `ice`
  - `errand`
- seed votes: `1`
- current observed votes: `1`

### Bear Valley Adventure Co.

- id: `bear-valley`
- notes: `Rentals, snacks, gas, Lake Alpine support stop`
- tags:
  - `rentals`
  - `gas`
  - `longer drive`
- seed votes: `1`
- current observed votes: `1`

## 17. Current Persisted State Snapshot

Current state file:

- `data/cabin-state.json`

Observed state:

- version: `9`
- updatedAt: `2026-06-27T18:10:19Z`
- familyChecks:
  - `bear`: true
- familyResponses:
  - currently empty
- meal ownership:
  - `fri-dinner`: Bear / Jessica / Jear
  - `fri-dessert`: Nick / Marissa / G6
  - all other meal slots are open
- supply ownership:
  - `smores`: Nick / Marissa / G6
  - `eggs`: Bear / Jessica / Jear
  - `steaks`: Bear / Jessica / Jear
  - `other-meats`: Bear / Jessica / Jear
  - `hot-dogs-buns`: Bear / Jessica / Jear
  - `blackstone-two-burner`: Bear / Jessica / Jear
  - `cranium`: Bear / Jessica / Jear
  - `charades`: Natalie / Andy / Riggs
  - all other supply items are open

Important:

- All "who is bringing what" statements from before June 27, 2026 are invalid.
- Do not reintroduce pre-June-27 ownership from older docs, seed notes, or conversation history.

## 18. API Details

### 18.1 `GET /api/state`

Purpose:

- Fetch the full shared state.

Auth:

- Required only if `APP_PASSCODE` is set.

Success response:

```json
{
  "state": {
    "version": 6,
    "updatedAt": "2026-06-16T04:50:18.944Z",
    "meals": [],
    "supplies": [],
    "familyChecks": {},
    "familyResponses": {},
    "activityVotes": {}
  }
}
```

Actual arrays/objects contain full state.

### 18.2 `POST /api/action`

Purpose:

- Apply one state-changing action.

Expected request:

```json
{
  "type": "claimMeal",
  "payload": {
    "id": "fri-lunch",
    "owner": "bear"
  },
  "clientId": "client-id"
}
```

Success:

- status `200`
- body includes:
  - `changed`
  - `message`
  - `state`

Conflict/no change:

- status `409`
- body includes current state and message.

Bad request:

- status `400`

Unauthorized:

- status `401`

### 18.3 `GET /api/events`

Purpose:

- Subscribe to live state updates.

Protocol:

- Server-sent events

Initial response sends:

```text
event: state
data: {full state json}

: connected
```

On every changed action:

- server writes a new `state` event to every connected client.

## 19. Server-Side Action Behavior

### 19.1 `claimMeal`

Payload:

- `id`
- `owner`

Validation:

- meal must exist
- owner must be one of `shell`, `nick`, `nat`, `bear`
- meal cannot already be owned by a different family

State change:

- sets meal owner

Messages:

- success: `Meal claimed.`
- missing/invalid: `Meal slot not found.`
- already claimed: `That meal is already claimed.`

### 19.2 `toggleSupply`

Payload:

- `id`
- `owner`

Validation:

- supply must exist
- owner must be valid
- cannot change item claimed by another family

State change:

- if open, sets owner
- if owned by same family, clears owner

Messages:

- success claimed: `Supply claimed.`
- success unclaimed: `Supply moved back to still needed.`
- invalid: `Supply item not found.`
- already claimed: `That supply is already claimed.`

### 19.3 `voteActivity`

Payload:

- `id`

Validation:

- id must match a known app activity
- signed-in profile must resolve to a valid family

State change:

- toggles `activityVoters[id][familyId]`

Messages:

- success: `Vote added.`
- success remove: `Vote removed.`
- invalid: `Activity not found.`

Note:

- Existing numeric `activityVotes` values remain as baseline counts.
- New family-specific votes are stored separately in `activityVoters`.

### 19.4 `checkin`

Payload:

- `familyId`
- `arrival`
- `leaving`
- `kidFood`
- `allergies`
- `gear`

Validation:

- family id must be valid
- text fields truncated to 180 characters
- gear array is sanitized and capped at 12 entries

State change:

- sets `familyChecks[familyId] = true`
- sets `familyResponses[familyId]`
- sets response `updatedAt`

Message:

- success: `Check-in saved.`
- invalid: `Choose a family first.`

### 19.5 `addMealIdea`

Payload:

- `day`
- `type`
- `idea`
- `kids`

Validation:

- idea must not be empty
- day is constrained to `fri`, `sat`, `sun`, `mon`
- invalid day becomes `sun`
- text fields truncated to 180 characters

State change:

- pushes new meal object

Generated fields:

- id: `meal-${Date.now()}`
- dayLabel from day
- time: `Flexible`
- owner: empty
- cold: empty array

Message:

- success: `Meal idea added.`
- invalid: `Meal idea is empty.`

### 19.6 `addSupply`

Payload:

- `name`
- `qty`
- `type`

Validation:

- name must not be empty
- type constrained to `dry goods`, `cold`, or `gear`
- invalid type becomes `dry goods`
- text fields truncated to 180 characters

State change:

- pushes new supply object

Generated fields:

- id: `supply-${Date.now()}`
- owner: empty

Message:

- success: `Supply added.`
- invalid: `Supply item is empty.`

### 19.7 `reset`

Payload:

- no normal user payload required

Auth:

- admin auth required

State change:

- loads seed
- normalizes state
- replaces `sharedState`
- increments version/timestamp after action handler runs
- persists
- broadcasts

Message:

- success: `Trip board reset.`
- unauthorized: `Unauthorized reset.`

## 20. Client-Side Behavior Details

### 20.1 Load sequence

On script load:

1. Insert inline SVG icons into nodes with `data-icon`.
2. Render local/default state.
3. Bind events.
4. Register service worker if supported and HTTP.
5. Attempt shared-state connection.

### 20.2 Shared connection sequence

1. If not HTTP, app sets sync badge to `Local only`.
2. If HTTP, app sets sync badge to `Connecting`.
3. App calls `/api/state`.
4. If unauthorized, app prompts for passcode.
5. If state fetch succeeds, app applies shared state.
6. App sets sync badge to `Live sync`.
7. App opens `/api/events`.

### 20.3 Action sequence

When a user clicks claim/vote/check-in/add:

1. Validate basic client-side requirement.
2. Attempt `POST /api/action`.
3. If unauthorized, prompt for passcode and retry.
4. If success, apply returned state.
5. Show toast message.
6. If an HTTP/HTTPS network/API failure prevents the write, do not mutate local shared state.
7. Show a reconnect message and leave the shared board unchanged.
8. For non-HTTP local file usage only, perform local fallback mutate and save local storage.

### 20.4 Escape and focus behavior

Drawers:

- save last focused element when opened
- restore focus when closed
- close on backdrop click
- close on Escape
- trap Tab focus inside open drawer

This is a useful accessibility baseline.

## 21. Authentication Details

### 21.1 Environment variables

Supported:

- `APP_PASSCODE`
- `APP_ADMIN_PASSCODE`
- `SESSION_SECRET`
- `AUTH_COOKIE_TTL`
- `DATA_DIR`
- `PORT`

### 21.2 Auth token behavior

- Server creates HMAC signature from passcode using session secret.
- Cookie stores token, not the passcode.
- Timing-safe comparison is used.

### 21.3 Passcode storage on client

- Client stores passcode in localStorage.
- Client also sends passcode in query param for SSE because native `EventSource` cannot set custom request headers.
- Query passcode is cleaned from the visible URL after initial capture.

Security note:

- This is reasonable for a small family app on a trusted local network.
- It is not a full production authentication system.
- Public deployment would need a more deliberate auth posture.

## 22. Service Worker Details

Cache name:

- `cabin-game-plan-v10`

Install cache list:

- `/`
- `/index.html`
- `/styles.css`
- `/script.js`
- `/manifest.webmanifest`
- `/assets/favicon.svg`
- `/assets/cabin-hero.png`

Fetch behavior:

- only same-origin GET requests are handled
- returns cached response if present
- otherwise fetches network
- successful network responses are cached

Possible issue:

- Because the service worker cache is cache-first, stale JS/CSS could remain until cache version changes.
- If future frontend changes do not show up, bump `cacheName`.

## 23. What Was Verified

The following checks were performed during the work leading into this document:

- app server responded to `GET /`
- `/api/state` returned JSON state
- `/api/action` accepted properly shaped action payloads
- wrong/absent passcode produced unauthorized behavior when passcode was enabled in test mode
- correct passcode allowed actions
- `voteActivity` successfully adds and removes the signed-in family's current vote
- admin reset succeeded with admin passcode
- SSE endpoint emitted initial state event
- `node --check server.js` passed
- live local server currently responds on `http://localhost:8000/`

## 24. What Was Fixed

### 24.1 Reset seed fallback

Before:

- Reset behavior could fail when `DATA_DIR` existed without `seed-state.json`.

After:

- `loadSeedState()` handles fallback from data-dir seed to bundled seed.
- Startup and reset use the same seed-loading path.

Why it matters:

- The app can be deployed or run with external data directory without breaking reset.
- Reset is safer and more predictable.

### 24.2 Auth edge-case hardening

The server includes passcode and cookie handling that supports:

- normal passcode
- admin passcode
- query passcode
- header passcode
- cookie reuse

This makes phone usage and SSE usage more practical.

## 25. What The Current App Does Well

- Runs without package install complexity.
- Works as a shared planning board that is ready for managed public website/PWA deployment.
- Persists shared state to disk.
- Pushes updates live to connected clients.
- Has a clear phone-oriented UI.
- Provides visible next actions.
- Prevents users from claiming already-owned supplies/meals.
- Lets users add missing meal/supply items.
- Has a simple passcode option.
- Has a service worker and installable metadata.
- Has enough existing structure to become a fuller app without starting over.

## 26. Current Known Gaps

### 26.1 Dangling selectors in JS

The script references some elements that do not currently exist in `index.html`:

- `#mealPreview`
- `#activityPreview`
- `#mealClaimedCount`
- `#supplyClaimedCount`
- `#coldCount`
- `#coldMeter`
- `.day-tabs`

Impact:

- These references are guarded and do not break primary rendering.
- They indicate the UI was likely simplified or partially refactored.
- A future cleanup pass should remove dead render paths or add the missing UI.

### 26.2 Some checkboxes do not persist

The following static checkbox groups do not save to shared state:

- Questions for Shel
- Cabin gear checklist

Impact:

- If a user checks them, the check is only temporary in the current browser DOM.
- Refreshing loses those checkbox states.

### 26.3 Cabin information is hardcoded

The cabin info screen contains placeholder values:

- Address: `1234 Pine Ridge Road, Arnold, CA`
- Door code: `TBD`
- Wi-Fi: `TBD`
- Checkout: `Monday July 6 - time TBD`
- Cell service: `Confirm at cabin`

Impact:

- This is not yet a dynamic source of truth.
- The app needs editable/admin-controlled cabin info if it should be final.

### 26.4 Activity votes are family-bound

Current voting behavior:

- each signed-in family gets one current vote per activity
- clicking again removes that family's vote
- direct API calls with unknown activity ids are rejected

Impact:

- Useful for casual interest tracking without accidental repeated tapping.
- Still intentionally lightweight; it is not a formal ranked-choice poll.

### 26.5 Meal claims are reversible

Current behavior:

- supply claims can be unclaimed by the signed-in owner family
- meal claims can be unclaimed by the signed-in owner family

Impact:

- Mistaken meal/supply claims can be corrected without manual JSON edits.

### 26.6 Custom item edit/delete is ownership-bound

Current behavior:

- users can add meal ideas and supplies
- user-added meal ideas and supplies can be edited or deleted by the creating family or current owning family
- protected starter rows cannot be deleted

Impact:

- Mistakes in custom additions can be corrected from the app while preventing other households from editing unrelated custom rows.

### 26.7 Profile-bound identity is active

Current behavior:

- profile login stores selected attendee/person id, first name, email, family, optional password, and optional passkey
- tapping a person in the auth screen pre-fills first name and household
- claims, check-ins, votes, and custom item ownership derive from the signed-in profile family
- family pickers are locked to the signed-in profile family

Impact:

- Better aligned with public website use.
- Still intentionally lightweight and invite-code based, not a broad public account system.

### 26.8 Public URL deployment is configured but not complete

Current scope:

- The repo includes `render.yaml` for a managed public website/PWA deployment.
- The app has production invite-code fail-closed behavior, profile sessions, persistent state paths, and HTTPS/passkey-ready settings.

Still needed:

- create/deploy the paid hosted service
- set production environment variables
- verify the final URL on desktop and iPhone Safari
- verify Add to Home Screen behavior on a real iPhone

### 26.9 No automated tests

Current checks were manual/API-level.

Missing:

- unit tests for action reducer
- integration tests for API
- browser tests for UI
- mobile viewport screenshot checks
- service worker update tests

### 26.10 Cache invalidation could confuse frontend changes

The service worker uses a fixed cache name:

- `cabin-game-plan-v10`

If JS/CSS changes:

- browser may serve cached assets until cache updates.

## 27. What The App Should Become

The app should become a polished, reliable, family-friendly cabin planning tool that can be shared with the family and trusted as the single planning board.

The ideal finished app should:

- open quickly on phones
- show live status immediately
- make family selection obvious
- make claims easy and reversible
- make unclaimed responsibilities prominent
- let organizer update cabin details
- persist all meaningful checklists
- avoid stale data confusion
- show clear sync/offline status
- recover gracefully from server restarts
- be easy to deploy if remote access is needed
- keep the friendly cabin/trip tone

## 28. Recommended Next Build Work

### 28.1 Product completion

Add:

- editable cabin info
- persistent Shel questions
- persistent gear checklist
- meal unclaim
- clearer custom ownership messaging if a family tries to manage another family's custom row
- clearer family check-in completion details
- clearer activity preference summary if the organizer wants more than simple vote counts

### 28.2 UX completion

Improve:

- mobile nav coverage for all panels or a menu
- empty states
- loading states
- offline states
- passcode prompt UX
- stale-service-worker handling
- tap target consistency
- dashboard information density

### 28.3 Backend completion

Add:

- schema versioning
- state migration path
- action validation for known activity IDs
- optional audit log
- robust reset endpoint or admin UI button
- backup state file before destructive reset
- explicit write error handling

### 28.4 Testing

Add tests for:

- startup from seed
- startup from persisted state
- startup with custom `DATA_DIR`
- reset fallback behavior
- claim meal conflicts
- supply claim/unclaim
- check-in persistence
- activity vote add/remove per signed-in family
- add meal idea
- add supply item
- unauthorized access
- SSE initial event
- static path traversal blocking

### 28.5 Deployment

If app needs off-Wi-Fi use:

- choose hosting target
- make HTTPS URL
- decide persistence mechanism
- decide auth model
- decide whether file-based JSON is enough
- deploy persistent Node runtime or port to serverless-compatible architecture

## 29. Four-Agent Implementation Perspectives

This section captures the user's earlier request for four different opinions on making the app real.

### 29.1 Product Agent Opinion

The app's biggest value is reducing family planning ambiguity.

Priority:

1. Make open responsibilities impossible to miss.
2. Make claiming and unclaiming safe.
3. Make family check-ins easy.
4. Make cabin details editable.
5. Avoid overbuilding.

Product agent would say:

- The core app is correctly scoped.
- Do not turn it into a general project management app.
- Keep the experience focused on the July cabin trip.
- The next best product change is persistent cabin/checklist details plus reversible meal claims.

### 29.2 Frontend Agent Opinion

The app has a solid shell but needs UI cleanup.

Priority:

1. Remove dangling JS render paths or restore missing UI sections.
2. Improve mobile navigation so all important screens are accessible on phone.
3. Add edit/delete affordances.
4. Make passcode prompt less browser-native.
5. Verify responsive layout with screenshots.

Frontend agent would say:

- The UI is already usable.
- The hero and panels create a nice trip-specific feel.
- Some static checklists look interactive but are not persisted, which can mislead users.
- Every visible interactive control should either persist or be made visibly informational.

### 29.3 Backend/Sync Agent Opinion

The architecture is appropriate for a small managed public website/PWA with local same-Wi-Fi preview available.

Priority:

1. Extract action logic into testable reducer.
2. Add basic automated tests.
3. Add schema validation.
4. Add action log/backups.
5. Clarify public deployment path.

Backend agent would say:

- File-backed JSON plus SSE is a good fit for this scope.
- The reset seed fallback fix was important.
- Conflict handling is simple but acceptable for family use.
- Public hosting requires more thought.

### 29.4 QA/Release Agent Opinion

The app needs a verification checklist before family sharing.

Priority:

1. Test on desktop browser.
2. Test on iPhone Safari over LAN.
3. Test two phones claiming at once.
4. Test passcode flow.
5. Test server restart and state recovery.
6. Test service worker refresh behavior.
7. Test accidental wrong taps.

QA agent would say:

- Do one family-use rehearsal before sending the link.
- Keep a backup copy of `data/cabin-state.json`.
- Confirm exact cabin details before treating the Cabin tab as final.

## 30. Suggested Definition Of Done

The app should be considered "ready for the family" when:

- The server starts with `npm start`.
- The console prints a LAN URL.
- The Mac and at least one iPhone can open the app.
- Two devices see the same state.
- Claiming a meal on one device updates the other.
- Claiming/unclaiming a supply works.
- Check-in submission updates People view.
- Activity vote add/remove updates live.
- Add meal idea works.
- Add supply works.
- Refreshing both devices preserves state.
- Restarting server preserves state.
- Passcode flow works, if enabled.
- No important visible control is fake/non-persistent.
- Cabin details are no longer placeholder, or clearly marked as unconfirmed.

## 31. Exact Commands

### Start app

```bash
npm start
```

### Start app on custom port

```bash
PORT=8012 npm start
```

### Start with passcode

```bash
APP_PASSCODE=your-passcode npm start
```

### Start with separate admin passcode

```bash
APP_PASSCODE=family-passcode APP_ADMIN_PASSCODE=admin-passcode npm start
```

### Start with custom data directory

```bash
DATA_DIR=/path/to/data npm start
```

### Check server JavaScript syntax

```bash
node --check server.js
```

### Check local app response

```bash
curl -I http://localhost:8000/
```

### Check state endpoint

```bash
curl http://localhost:8000/api/state
```

### Reset by file deletion

```bash
rm -f data/cabin-state.json
npm start
```

Only do this when you really want to remove live saved state.

## 32. Manual Test Checklist

### Startup

- Run `npm start`.
- Confirm console says Cabin Game Plan is running.
- Confirm `http://localhost:8000/` opens.
- Confirm app shows dashboard.
- Confirm sync status becomes live sync.

### Family picker

- Pick Shell.
- Refresh.
- Confirm Shell remains selected.
- Pick Bear.
- Refresh.
- Confirm Bear remains selected.

### Meal claim

- Select a family.
- Claim an open meal.
- Confirm meal shows owner pill.
- Open app in another browser/device.
- Confirm other device sees claim.

### Supply claim

- Select a family.
- Claim open supply.
- Confirm button becomes Unclaim.
- Click Unclaim.
- Confirm supply returns to open.
- Claim as one family.
- Switch to another family.
- Confirm item cannot be changed by other family.

### Check-in

- Open People.
- Open check-in drawer.
- Select family.
- Step through arrival/leaving.
- Enter kid food.
- Enter allergies.
- Select gear.
- Submit.
- Confirm family card updates.
- Refresh.
- Confirm state persists.

### Activity votes

- Open Ideas.
- Click vote.
- Confirm count increases and button changes to Remove vote.
- Click Remove vote.
- Confirm count returns to the baseline and button changes back to Vote.
- Refresh.
- Confirm count persists.
- Open another device.
- Confirm count syncs.

### Add meal

- Open Meals.
- Click Add meal idea.
- Enter a meal idea.
- Save.
- Confirm it appears under selected day.
- Confirm it is claimable.
- Refresh.
- Confirm it persists.

### Add supply

- Open Supplies.
- Click Add item.
- Enter item name and amount.
- Save.
- Confirm it appears.
- Claim it.
- Refresh.
- Confirm it persists.

### SSE/live sync

- Open app in two browser windows.
- Take action in window A.
- Confirm window B updates without manual refresh.

### Offline / failed shared write

- Stop server.
- Try local action.
- Confirm UI shows sync error / reconnect behavior.
- Restart server.
- Confirm the failed action did not locally change claims, votes, checklists, or added items as if they were shared.

## 33. Data Safety Notes

The live board state is stored in:

- `data/cabin-state.json`

This file is important.

Before risky changes:

```bash
cp data/cabin-state.json data/cabin-state.backup.json
```

The seed state is stored in:

- `data/seed-state.json`

Do not edit seed casually if reset behavior should return to the known starter board.

## 34. Important Product Decisions Already Embedded

- Families are fixed to four known family units.
- Trip is fixed to July 2-6, 2026.
- Location is Arnold, California.
- Meal days are fixed to Friday through Monday.
- The board starts with partial claims already assigned.
- Bear family starts checked in.
- App assumes trusted family users.
- Hosted public website/PWA mode is the current intended usage.
- Same-Wi-Fi mode is a local preview/testing fallback.
- App avoids database complexity for now.
- App chooses file persistence for simplicity.

## 35. Questions Still Needing User Decisions

These are not blockers for current local use, but they matter before final polish:

- What is the real cabin address?
- What is the real door code?
- What is the Wi-Fi name/password?
- What is the real checkout time?
- Should family members be able to unclaim meals?
- Should custom item edit/delete stay limited to creator/current owner, or should there be an organizer override?
- Should activity voting remain a simple per-family toggle, or should it become a ranked preference list?
- Should the app be public/off-Wi-Fi accessible?
- Should there be an organizer/admin panel?
- Should check-in responses be editable after submission?
- Should checklists be persisted?
- Should the app export/print the plan?
- Should there be push notifications or reminders?

## 36. Risks

### 36.1 Server process risk

If the Node process stops, live sync stops.

Mitigation:

- keep terminal open
- use a process manager for longer use
- consider launch agent or hosting

### 36.2 LAN access risk

iPhones must be able to reach the hosted HTTPS URL. Local preview still requires same-Wi-Fi access to the Mac.

Mitigation:

- confirm Mac firewall allows incoming connection
- use printed LAN IP
- keep Mac awake

### 36.3 Data overwrite risk

State is one JSON file.

Mitigation:

- backup before big changes
- add action log/backups in future

### 36.4 Browser cache risk

Service worker may cache old assets.

Mitigation:

- bump cache name after frontend changes
- test in private window or clear site data

### 36.5 Fake-control risk

Static checkboxes look real but do not persist.

Mitigation:

- persist them or make them non-checkbox display rows

## 37. Best Next Single Step

The best next build step is:

> Make every visible interactive control real and persistent.

Specifically:

- Persist Questions for Shel.
- Persist Gear checklist.
- Add meal unclaim.
- Add edit/delete for custom additions.
- Remove or restore dangling JS UI targets.

This would move the app from "working local prototype" to "trustworthy family app."

## 38. Best Next Technical Refactor

Extract shared action logic from `server.js` into a pure reducer module:

- input: state + action
- output: next state + result

Why:

- easier tests
- safer future edits
- clearer conflict handling
- reusable for possible client-side fallback

Suggested file:

- `state-actions.js`

Suggested tests:

- `state-actions.test.js`

## 39. Best Next UI Refactor

Clean UI/render mismatch:

- Remove `renderMealPreview` if no `#mealPreview` will exist.
- Remove `renderActivityPreview` if no `#activityPreview` will exist.
- Remove count updates for missing IDs or add the missing visual cards.
- Remove `.day-tabs` listener if no day tabs are needed.

Why:

- less confusion
- less dead code
- easier future handoff

## 40. Final Plain-English Product Vision

Cabin Game Plan should feel like opening the family trip command center on your phone.

You should immediately see:

- what still needs someone
- what your family can take
- who has already handled what
- what food is planned
- what supplies are missing
- what the cabin details are
- what activities people want to do

The app should reduce mental load for the organizer and reduce awkward repeated texts for everyone else.

The current build has the right foundation. It has real state, real sync, real persistence, and a focused trip-specific UI. The next phase is about making it complete, polished, and trustworthy enough that every visible control can be relied on during the actual trip planning.
