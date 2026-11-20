# FitLog

FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.

## Live Demo

[Add your deployed Vercel link here](https://assignment6-nextjs-five.vercel.app/)

## Tech Stack

- Next.js 16 (App Router, server components)
- React 19
- TypeScript
- Tailwind CSS v4
- Context API + React hooks
- `react-hot-toast` notifications
- DaisyUI (available component classes)
- Oswald display font via `next/font`
- Browser `localStorage` for persistence

## Features

1. **Workout library** — all 12 lifts from the FitLog API in a responsive card grid with muscle tags, equipment, duration, calories, and rating.
2. **Workout details** — dynamic `/workout/:id` pages with an image, full spec table, numbered instructions, and add/save actions.
3. **Today's plan** — add up to five lifts, mark them done, and remove them. Plan and Saved counters update instantly in the navbar.
4. **Saved workouts** — save lifts for later and manage them from the Saved tab on the My Plan page.
5. **Persistent local state** — plan, saved, and done status survive reloads through `localStorage`.
6. **Live metrics and sorting** — My Plan shows exercises, minutes, and calories, and can sort by duration, calories, or rating.
7. **Toast feedback** — every add, save, remove, and completion action shows a toast.

## Routes

| Route | Description |
| --- | --- |
| `/` | Hero + workout library |
| `/workout/:id` | Workout details |
| `/my-plan` | Today's Plan and Saved tabs |
| Any unknown route | Custom 404 page |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

```bash
npm run dev        # development server
npm run lint       # ESLint
npm run typecheck  # TypeScript check
npm run build      # production build
npm start          # production server
```

## Data Source

All workout data comes from:

```text
https://api.abcz.workers.dev/api/fitlog
```

The detail page uses `https://api.abcz.workers.dev/api/fitlog/:id`.

## Deployment

The project is ready for Vercel. Push the repository to GitHub, import it in Vercel, and deploy — no environment variables are required. Next.js handles dynamic routes and reloads automatically.
