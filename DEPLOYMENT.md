# Public Website Deployment

The current deployment path is:

- frontend: Cloudflare Pages
- backend: Supabase Edge Function `trip-api`
- shared data: Supabase Postgres

Target public URL:

- `https://gtonetrip.beareberly.com`

## Current Supabase Project

- Project ref: `qriowkpqhgxjnapxpdgc`
- Project URL: `https://qriowkpqhgxjnapxpdgc.supabase.co`
- Edge Function: `trip-api`

The frontend reads its public connection values from `app-config.js`.

## Current Cloudflare Pages Project

- Project name: `gtonetrip`
- Default Pages URL: `https://gtonetrip.pages.dev`

Pages serves the static files from the repo root. There is no Node server required in production anymore.

## Backend Responsibilities

`trip-api` handles:

- `POST /login`
- `POST /logout`
- `GET /me`
- `POST /profile`
- `GET /state`
- `POST /action`
- `GET /passkey/status`
- `POST /passkey/register/options`
- `POST /passkey/register/verify`
- `POST /passkey/auth/options`
- `POST /passkey/auth/verify`

The function uses the shared trip password plus the selected adult name. The default fallback is `1333`, but the organizer can now change the shared password online and have that apply everywhere.

## Database Responsibilities

Supabase stores:

- `public.trip_state`
- `public.app_sessions`
- `public.passkey_credentials`
- `public.passkey_challenges`

`trip_state` holds the singleton shared board state under key `primary`, including the shared trip board plus shared profile display/photo settings.

## Cloudflare Setup

1. Connect the GitHub repo `BearEberly/gtonetrip` to the Pages project `gtonetrip`.
2. Set production branch to `main`.
3. Use:
   - build command: blank
   - output directory: `.`
4. Add custom domain:
   - `gtonetrip.beareberly.com`

## Deployment Checks

After deploy:

```bash
curl -I https://gtonetrip.pages.dev/
curl -I https://gtonetrip.beareberly.com/
curl -s https://qriowkpqhgxjnapxpdgc.supabase.co/functions/v1/trip-api/state -H "Authorization: Bearer <session-token>"
```

Browser checks:

- login page shows adult-name picker plus password field
- password `1333` works
- logged-in name appears in the top right
- calendar, logistics, bringing, meals, and more render on iPhone width
- logistics saves to the shared backend
- refresh preserves shared data
- another device sees changes

## Login Behavior

Current login flow:

- choose one adult name
- enter the shared password `1333`
- the device stays signed in for about 30 days unless the user signs out
- optionally save a passkey / Face ID after the first password sign-in for one-tap return visits

Allowed login names are Shell, Nick, Marissa, Bear, Jessica, Andy, and Natalie. Kids do not log in.

## iPhone Install Flow

After deployment:

1. Open the HTTPS URL on iPhone Safari.
2. Log in with one adult name and `1333`.
3. Tap Share.
4. Tap Add to Home Screen.

## Legacy Note

`render.yaml` remains in the repo as the older Node-hosted path, but it is no longer the target architecture for the live app.
