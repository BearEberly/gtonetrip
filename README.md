# Cabin Bring Board

Phone-first shared claim board for the July 2-6, 2026 Arnold trip.

The app can run two ways:

- locally on one Mac for same-Wi-Fi family use
- publicly as a managed website URL with persistent shared state

The preferred path is now the public website/PWA path: deploy the Node app to a managed host, send the HTTPS URL to family, and have iPhone users add it to their Home Screen.

## Run It

```bash
npm install
npm start
```

The server prints two kinds of links:

- `http://localhost:8000` for this Mac
- `http://<your-mac-wifi-ip>:8000` for iPhones on the same Wi-Fi

Send the Wi-Fi IP link to the phones. Everyone will see the same live board.

For local testing with the same simple password behavior as production:

```bash
APP_PASSCODE=1333 APP_ADMIN_PASSCODE=admin npm start
```

## What Syncs Live

- Meal claims
- Supply claims
- Family check-ins
- Shared Shell / cabin logistics checklist items
- Family-bound activity votes and vote removal
- Added meal ideas
- Added supply items
- Edited/deleted custom meal ideas and supply items

The server stores shared edits in `data/cabin-state.json`. If that file does not exist, it starts from `data/seed-state.json`.

On the public website/PWA path, failed shared writes are blocked instead of saved only on one phone. If the app cannot reach the shared board, reconnect and try again.

## Login / Profiles

The public app uses a simple profile layer:

- trip invite code (`APP_PASSCODE`)
- tap-your-name attendee picker
- first name
- email
- family/household
- optional password
- optional Apple passkey / Face ID / Touch ID on secure HTTPS URLs

The attendee picker includes the named trip group and pre-fills first name and household. The server stores the selected attendee as `personId`, so multiple people can use the same family email while keeping separate profiles.

Claims and check-ins are saved under the signed-in profile's family. This prevents the browser from pretending to claim as a different household than the signed-in user.

Existing password-protected profiles require the password before profile details can change. Existing passwordless profiles can be resumed only under their already assigned family, and a fresh session cannot move that email to a different family.

Passkeys require user verification, so supported Apple devices should use Face ID, Touch ID, or the device passcode during passkey setup/sign-in.

In production, `APP_PASSCODE` must be set. If `NODE_ENV=production` and `APP_PASSCODE` is blank, API access fails closed instead of exposing the board publicly.

## Login / Profiles

Current login flow:

- choose one adult name
- enter the shared password `1333`

Login choices are limited to Shell, Nick, Marissa, Bear, Jessica, Andy, and Natalie. Kids do not log in. The selected adult is stored as `personId` so updates still stay tied to the right household.

## iPhone Install

After profile login, the app shows an install panel unless it is already running from the Home Screen. On iPhone Safari, use Share, then Add to Home Screen. On browsers that support native PWA install prompts, the install button opens the browser install prompt.

The service worker also surfaces an update-ready state when a new cached app shell is available.

## Editing Rules

- Starter meals and supplies are protected.
- User-added meal ideas and supply items can be edited or deleted from the app.
- Custom meal ideas and supply items can be edited or deleted only by the family that added them or currently owns them.
- Meal claims and supply claims can be undone by the signed-in family that owns them.
- Activity votes can be added or removed once per signed-in family.
- Shared checklist items persist for everyone.

## Reset The Board

To reset to the starter trip plan, stop the server, remove `data/cabin-state.json`, and start it again.

```bash
rm -f data/cabin-state.json
npm start
```

## Current Scope

This is prepared for public website deployment. See `DEPLOYMENT.md` and `render.yaml`.

Static-only hosting is not enough for shared editing. Use a host that can run the Node server and keep persistent data.
