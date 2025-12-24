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

## Architecture & Principles

- FSD (Feature-Sliced Design):
  - entities, features, shared, widgets, app
- SSR for initial task loading
- CRUD via Next.js API routes
- In-memory store (data is lost after server restart)
- All operations (create, edit, delete) go through the server
- Toast notifications for success/error
- Client-side form validation

## Decisions

- **HeroUI** chosen for UI, modals, and toasts — modern, fast, easily customizable
- **TanStack Query** for task synchronization and global state
- **FSD** for scalability and clean structure
- **Validation** via Zod and React Hook Form — flexible and type-safe
- **Errors** are always returned from the server as JSON `{ error: string }`
- **SSR** for initial task loading (SEO & fast start)
