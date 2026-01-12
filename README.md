# Guru Tasks

Jira-style Task Board (Next.js + TypeScript + Tailwind)

## Getting Started

1. Install dependencies:

   ```sh
   npm install
   ```

2. Start the dev server:

   ```sh
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Live Preview

See a deployed preview at: [https://guru-tasks-flame.vercel.app/](https://guru-tasks-flame.vercel.app/)

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- TanStack Query (global state)
- HeroUI (UI, modals, toasts)
- React Hook Form + Zod (form validation)
- Prisma ORM + PostgreSQL

## Architecture & Principles

- Feature-Sliced Design (FSD): `app`, `entities`, `features`, `widgets`, `shared`
- Server-side rendering for initial task loading
- REST API routes under `app/api/tasks`
- Persistent storage with Prisma ORM + PostgreSQL
- Optimistic UI updates for better UX

## Database

- Prisma schema: `prisma/schema.prisma` (PostgreSQL datasource)
- Important scripts (in `package.json`):
  - `npm run db:generate` — `prisma generate` (regenerates client/types)
  - `npm run db:push` — `prisma db push` (quick sync)
  - `npm run db:migrate` — `prisma migrate dev` (create/apply migrations)
  - `npm run db:studio` — `prisma studio`
  - `npm run db:seed` — run seeders

When you change the schema, run:

```bash
npx prisma generate
npx prisma migrate dev --name <desc>   # or `npx prisma db push` for a quick sync
```

After schema changes that affect enums/arrays, regenerate client and update usages.

## Server-only API & FSD

Server-only implementations (Prisma clients, repositories, services) must be exported through server-only barrels. Conventions used here:

- `src/entities/<feature>/server.ts` — server barrel that re-exports feature server APIs

Do NOT re-export server-only items from client-visible barrels such as `src/shared/lib/index.ts` or `src/entities/<feature>/model/index.ts` — doing so will pull native/server-only modules into client bundles (causes build/runtime errors).

## Data Validation & Normalization

- Client: forms use React Hook Form + Zod for UX validation. Components normalize input before sending (see `normalizeTask` exported from `entities/task`).
- Server: API routes perform authoritative validation and sanitization using Zod before calling services. Always validate IDs (UUID), trim/limit strings.

This dual-layer approach ensures good UX (client) and security/data integrity (server).

## Conventions & Notes

- `Task.labels` is modeled as an enum array in Prisma — allowed values live in `src/entities/task/const/label.ts`.
- `taskService` returns a domain error shape `{ error: string, status?: number }` for business errors (e.g., unique key, not found).
- Normalization utility `normalizeTask` is shared between client and server to keep behavior consistent (trim, limit lengths).

## Development Workflow

- Start dev server: `npm run dev`
- Regenerate Prisma client: `npm run db:generate` (or `npx prisma generate`)
- Apply schema changes: `npm run db:migrate` or `npm run db:push`
- Lint: `npm run lint`
