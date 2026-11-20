# AGENTS.md

FitLog is a single Next.js App Router app (not a monorepo): a workout library, a dynamic detail page, and a browser-local Today's Plan / Saved log.

## Commands

```bash
npm ci               # package-lock.json is the only lockfile; README's yarn/pnpm/bun mentions are boilerplate
npm run dev          # dev server on :3000
npm run lint         # bare `eslint` over the repo (ESLint 9 flat config)
npm run typecheck    # tsc --noEmit
npm run build && npm start
```

- No tests, test runner, formatter, CI, or pre-commit hooks are configured. Do not invent test commands.
- Verify with `npm run typecheck`, `npm run lint`, then `npm run build`.

## Routing and data flow

- Routes live only in `src/app`; `@/*` maps to `src/*`.
  - `/` — server page with hero; `WorkoutLibrary` is a client component that fetches the API.
  - `/workout/[id]` — async server page; `params` is a Promise. Invalid IDs call `notFound()`.
  - `/my-plan` — client page using the shared context; `isHydrated` gates the loading state.
- API base is hardcoded to `https://api.abcz.workers.dev/api/fitlog` and has no env var. `getWorkoutById` uses `/api/fitlog/:id` (404 → `null`) instead of fetching the full list.
- The workout shape is `IWorkout`; plan entries are `IPlanWorkout` with `isDone`. `next/image` remote hosts are allowlisted in `next.config.ts` (`img.magnific.com`).

## Shared state

- `FitLogProvider` wraps the app in `src/app/layout.tsx`; `useFitLog` throws outside it.
- Plan/saved persist under `fitlog-plan` and `fitlog-saved`; old `fitlog-done` IDs are migrated into `isDone` on load. Persist effects are gated on `isHydrated` to avoid wiping storage on mount.
- Plan is capped at 5; duplicate adds/saves are rejected; `metrics` (`exercises`, `minutes`, `calories`) is derived from `plan` every render. All mutating actions fire `react-hot-toast` notifications.

## Styling

- Tailwind v4 via `@tailwindcss/postcss`; there is no `tailwind.config`. Theme tokens live in `:root` in `src/app/globals.css`, and DaisyUI is enabled with `@plugin "daisyui"`.
- Accent is `#ccff00`. Display headings use `font-display` (Oswald from `next/font`); body remains the default sans.
- Keep client pages/components marked `"use client"` when they use hooks or context. `layout.tsx` and `app/page.tsx` stay server components.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
