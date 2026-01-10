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

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- TanStack Query (global state)
- HeroUI (UI, modals, toasts)
- React Hook Form + Zod (form validation)
- **Prisma ORM** (database, SQLite)

## Architecture & Principles

- FSD (Feature-Sliced Design):
  - entities, features, shared, widgets, app
- SSR for initial task loading
- CRUD via Next.js API routes
- **Persistent storage** with Prisma ORM + SQLite (data survives restarts)
- All operations (create, edit, delete) go through the server
- Toast notifications for success/error
- Client-side form validation
- **Optimistic updates** for all CRUD operations: UI updates instantly, then syncs with server (rollback on error)

## Database

- **Prisma ORM** with SQLite for local development
- Schema: `prisma/schema.prisma`
- Commands:
  - `npm run db:generate` - Regenerate client/types
  - `npm run db:push` - Sync schema with database
  - `npm run db:seed` - Seed data
  - `npm run db:studio` - Open Prisma Studio to view/edit data
  - `npm run db:migrate` - Run migrations
  - `npm run db:reset` - Reset database
  - `npm run db:postinstall` - Run `db:generate` and `db:migrate`

## Server-only API & FSD

Server-only code (Prisma clients, repositories, services) must be placed in dedicated server folders and exported via server-only barrels. Conventions used in this repo:

- `src/shared/server/prisma.ts` — Prisma singleton (server-only)
- `src/shared/server/index.ts` or `src/shared/server/*` — other shared server-only exports.

Do NOT re-export `prisma` or server implementations from client-visible barrels like `src/shared/lib/index.ts` or `src/entities/<feature>/model/index.ts`.

After changing `prisma/schema.prisma` run:

```bash
npx prisma generate
npx prisma migrate dev --name <desc>   # or `npx prisma db push` for quick sync
```

Note about `labels` field:

- The `Task.labels` column was migrated from `String` (JSON-encoded string) to Prisma `Json`. Until you run `npx prisma generate`, the generated client may still expect strings. The codebase currently accepts both formats; after `prisma generate` you can stop serializing `labels` and store arrays directly.

## Decisions

- **HeroUI** chosen for UI, modals, and toasts — modern, fast, easily customizable
- **TanStack Query** for task synchronization, global state, and optimistic updates (instant UI feedback)
- **FSD** for scalability and clean structure
- **Validation** via Zod and React Hook Form — flexible and type-safe
- **Errors** are always returned from the server as JSON `{ error: string }`
- **SSR** for initial task loading (SEO & fast start)
- **Optimistic updates**: all create, update, and delete actions are reflected in the UI immediately, with rollback on error
- **Prisma ORM** for persistent data storage with SQLite
