# Guantones 4th of July

Phone-first trip planner for the July 1-6, 2026 Arnold trip.

The app is now a static frontend backed by Supabase:

- Cloudflare Pages serves the site
- Supabase Edge Function `trip-api` handles login, state reads, and writes
- Supabase Postgres stores the shared trip state and simple sessions

This is the current live architecture. The older local Node/JSON backend is no longer the primary shared backend.

## Run It

```bash
npm start
```

That serves the static app shell at `http://localhost:8000`.

The frontend talks to Supabase using values from `app-config.js`, so local preview still uses the shared hosted backend.

## What Syncs Live

- Meal planning updates
- Bringing items
- Family logistics check-ins
- Shared calendar state
- Session login by adult name

The shared source of truth is now Supabase, not `data/cabin-state.json`.

`data/seed-state.json` remains the local seed/reference file used to initialize or mirror the trip data model.

## Login / Profiles

Current login flow:

- choose one adult name
- enter the shared password `1333`

Login choices are limited to Shell, Nick, Marissa, Bear, Jessica, Andy, and Natalie. Kids do not log in. The selected adult is stored as `personId` so updates still stay tied to the right household.

## iPhone Install

After login, open the HTTPS site in iPhone Safari and use Share -> Add to Home Screen.

## Editing Rules

- Shared trip state is stored centrally in Supabase.
- The logged-in adult name controls which family owns updates.
- The UI is designed for iPhone-first use.

## Reset The Board

Resetting the hosted board now means resetting the Supabase `trip_state` row, not deleting a local JSON file.

## Current Scope

This is prepared for public website deployment. See `DEPLOYMENT.md`.

The intended stack is Cloudflare Pages + Supabase.
