# Convex Integration Notes

This project can use Convex as its backend. The current app is a static HTML/CSS/JavaScript prototype, and all user-created data is routed through the centralized `forumStore` object in `script.js`, which makes the migration path fairly clean.

## Current State

- Frontend: static `index.html`, `styles.css`, and `script.js`.
- Runtime state: in-memory `state` object.
- Persistence: browser `localStorage`.
- Mutable data today:
  - forum threads
  - thread replies
  - reading notes
  - user preferences such as theme, reader font size, and reader layout

## Good Convex Targets

The first backend pass should move shared, multi-user data to Convex:

- `threads`
  - board
  - title
  - author
  - tag
  - body
  - views
  - pinned
  - updatedAt
- `replies`
  - threadId
  - author
  - body
  - createdAt
- `readingNotes`
  - userId or anonymous session id
  - reading
  - passage
  - title
  - body
  - createdAt

Local-only preferences can stay in `localStorage` at first:

- theme
- reader font size
- reader layout

## Recommended Path

1. Add a Node project setup with `package.json`.
2. Install Convex with `npm install`.
3. Run `npx convex dev` to create a Convex deployment and generate the `convex/_generated/` folder.
4. Copy the generated deployment URL into `config.js`.
5. Keep `seedThreads`, `boards`, `readings`, `books`, and `workPages` as frontend seed/static content until the app needs CMS-like editing.

## Frontend Refactor Point

The main migration boundary is near the top of `script.js`:

```js
const forumStore = {
  loadThreads() {},
  saveThreads(threads) {},
  loadReadingNotes() {},
  saveReadingNotes(notes) {},
  loadPreference(name, fallback) {},
  savePreference(name, value) {},
};
```

The thread, reply, view-count, and reading-note methods now call Convex when `window.CONVEX_URL` is configured. Preferences remain local.

## Important Constraint

Convex setup requires the Node/npm toolchain and a GitHub login during `npx convex dev`. In this Codex environment, the bundled Node executable works, but the system `npm` command is currently unavailable. Installing npm or using a full Node distribution is the next step before installing dependencies and generating `convex/_generated/`.

## Verdict

Convex is a good fit for this project once the static prototype becomes a shared forum. The cleanest first milestone is:

- keep the existing UI
- add Convex only for threads and replies
- leave user preferences local
- add auth later, after anonymous posting works end to end
