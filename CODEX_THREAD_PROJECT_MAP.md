# Codex Thread and Project Map

This project has three separate layers that were getting mixed together:

1. The real app files.
2. The Codex thread metadata that decides which project a chat appears under.
3. The raw Codex session logs that preserve the full conversation history.

## Real project folder

This is the actual app folder:

`/Users/bearbear/Documents/Work - Label Files/Folders/Guantones app`

This folder contains the app code and project docs, including:

- `README.md`
- `DEPLOYMENT.md`
- `TRIP_FACTS.md`
- `cabin-game-plan-full-spec.md`
- `CABIN_GAME_PLAN_COMPLETE_PRODUCT_BRIEF.md`
- `server.js`
- `script.js`
- `styles.css`
- `data/seed-state.json`
- `data/cabin-state.json`

## Old temporary Codex working folder

This path was an older Codex-generated working folder tied to the original thread metadata:

`/Users/bearbear/Documents/Codex/2026-06-13/i-need-to-speak-a-spreadsheet`

It is now empty and is not the real app repo.

## Threads that belong to this project

### Original full app-building thread

- Title: `Choose Live Multi-iPhone Signup Tool`
- Thread ID: `019ec390-ac81-7fe1-abe8-d4be36d10881`
- Current project attachment (`cwd`): `/Users/bearbear/Documents/Work - Label Files/Folders/Guantones app`
- Raw session log:
  `/Users/bearbear/.codex/sessions/2026/06/13/rollout-2026-06-13T17-38-19-019ec390-ac81-7fe1-abe8-d4be36d10881.jsonl`

### Continuation / review thread

- Title: `Review prior chat context`
- Thread ID: `019ec8de-f9e0-74d2-8075-ed7a0b34743c`
- Current project attachment (`cwd`): `/Users/bearbear/Documents/Work - Label Files/Folders/Guantones app`
- Raw session log:
  `/Users/bearbear/.codex/sessions/2026/06/14/rollout-2026-06-14T18-21-56-019ec8de-f9e0-74d2-8075-ed7a0b34743c.jsonl`

### Replacement / reattached thread

- Title: `Guantones app - reattached thread`
- Thread ID: `019f0f5e-991d-7ec1-b5f5-bbfb3e56e6cc`
- Current project attachment (`cwd`): `/Users/bearbear/Documents/Work - Label Files/Folders/Guantones app`
- Raw session log:
  `/Users/bearbear/.codex/sessions/2026/06/28/rollout-2026-06-28T10-54-45-019f0f5e-991d-7ec1-b5f5-bbfb3e56e6cc.jsonl`

## What decides which project a chat appears under

Codex groups a thread under a project by the thread's `cwd` value in the local thread database.

The relevant databases are:

- `/Users/bearbear/.codex/state_5.sqlite`
- `/Users/bearbear/.codex/sqlite/state_5.sqlite`

Inside those databases, the `threads` table stores:

- `id`
- `title`
- `cwd`
- `rollout_path`
- timestamps and other metadata

For this project, the important part is:

- if `cwd` points at the real Guantones app folder, the thread appears under that project
- if `cwd` points at the old empty temporary Codex folder, the thread appears disconnected from the real project

## Why things looked broken

The original full thread still existed, but its project attachment had been tied to the old empty Codex folder instead of the real app folder.

That made it look like:

- the original chat disappeared from the Guantones app project
- a newer reattached chat replaced it
- the empty temporary folder might be the source of truth

The conversation history itself was not deleted. The broken part was the project attachment metadata.

## Current fixed state

The original full thread and the continuation thread are both attached to:

`/Users/bearbear/Documents/Work - Label Files/Folders/Guantones app`

That means the original app-building chat now belongs under the real Guantones app project again.

## Remaining source of confusion inside the repo

One project handoff document still contains the older temporary folder path as historical context:

- `CABIN_GAME_PLAN_COMPLETE_PRODUCT_BRIEF.md`

That file is not the live thread attachment record. It is just a narrative project document that captured earlier context.
