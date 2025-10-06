# DevRedoy Portfolio Frontend

A full-stack ready portfolio and content management frontend built with the Next.js App Router. The public site showcases Bodruddoza Redoy's profile, while an authenticated dashboard lets the author curate blogs and projects against a headless API.

## Live Link: https://portfolio-frontend-b5-a7.vercel.app/

## Features
- Marketing pages for hero, about, skills, featured projects, blog highlights, and a contact form (client-side only today).
- Projects grid fed by `NEXT_PUBLIC_BASE_API` with optimistic updates for create, edit, and delete operations.
- Blog list, detail view, and dashboard management powered by server actions, incremental cache revalidation, and skeleton loading states.
- NextAuth credential flow that proxies `/auth/login` on the API, with middleware-protected `/dashboard` routes.
- Responsive layout built with Tailwind CSS v4, shadcn/ui primitives, Radix UI, and lucide-react icons.
- Toast feedback via Sonner, reusable hooks, strongly typed models, and path aliases for clean imports.

## Tech Stack
- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 with theme tokens and shadcn/ui components
- NextAuth.js (credentials provider)
- Turbopack dev/build pipeline, ESLint (flat config)
- Sonner notifications, Radix UI, lucide-react iconography

## Getting Started
1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Configure environment variables** - create a `.env` file (see below).
3. **Run the app**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000`.
4. **Optional checks**
   - `npm run lint`
   - `npm run build && npm run start`

> **Node**: Next.js 15 requires Node.js 18.18+ (Node 20+ recommended).

## Environment Variables
| Name | Required | Description |
| ---- | :------: | ----------- |
| `NEXT_PUBLIC_BASE_API` | Yes | Base URL of the backend API (`/project`, `/blog`, `/auth/login` endpoints are expected). |
| `NEXTAUTH_SECRET` | Yes | Secret for signing NextAuth JWTs and sessions. |
| `NEXTAUTH_URL` | Optional | Needed in production if the site is not served from `http://localhost:3000`. |

Example `.env`:
```bash
NEXT_PUBLIC_BASE_API=http://localhost:5000/api/v1
NEXTAUTH_SECRET=replace-with-strong-secret
NEXTAUTH_URL=http://localhost:3000
```

## Project Structure (abridged)
```
app/
  (public)/           # Public-facing routes (home, blogs, projects, contact, login)
  (dashboard)/        # Authenticated dashboard shell + nested resource pages
  api/auth/[...nextauth]/route.ts  # NextAuth handler bridging to backend
components/
  layout/             # Navbar, footer, sidebar
  modules/Home/       # Hero, About, Skills, Projects, Blog, Contact sections
  common/             # Skeleton loaders and shared pieces
  ui/                 # shadcn-generated primitives
actions/              # Server actions for blog CRUD + cache revalidation
hooks/                # API/data hooks (blogs, projects, user session, responsive helpers)
types/                # Blog, project, and user TypeScript models
helpers/authOptions.ts# NextAuth credentials provider configuration
provider/             # Client-side SessionProvider wrapper
```

## API Integration
- **Blogs**: `GET/POST /blog`, `PATCH/DELETE /blog/:id` (mutations use server actions that revalidate `/blogs`, `/dashboard/blogs`, and tag caches).
- **Projects**: `GET/POST /project`, `PATCH/DELETE /project/:id` (handled via client data hook for optimistic UI updates).
- **Auth**: `POST /auth/login` returns `{ data: { id, name, email } }` used by NextAuth credentials provider.

If an endpoint responds with non-2xx status the UI shows Sonner errors and falls back to skeleton or empty states.

## Authentication & Routing
- `AuthProvider` wraps the tree with `SessionProvider`.
- `middleware.ts` redirects unauthenticated users from `/dashboard*` to `/login`.
- `useGetUserClient` exposes the active NextAuth session for navbar and dashboard UI.

## Styling & UX
- Global theme tokens defined in `app/globals.css` map to Tailwind CSS v4 custom properties.
- Components lean on shadcn/ui (cards, tabs, badges, sidebar) with Radix behavior and lucide icons.
- Loading states supplied via `Skeleton` components for both blog and project dashboards.
- Contact form currently logs submissions to the console; wire it to your API or email service as needed.

## Known Gaps & Next Steps
- Public `/projects` and `/contact` route components are placeholders awaiting real UI.
- Contact form lacks a backend integration.
- Replace hard-coded social links and imagery with live data once available from the API.
- Remove development `console.log` statements before production deployment.

## Tooling Notes
- `next.config.ts` allows remote images from any HTTPS host.
- ESLint flat config (`eslint.config.mjs`) extends `next/core-web-vitals` and `next/typescript`.
- `components.json` tracks shadcn/ui setup with aliases like `@/components` and `@/lib/utils`.

## License
No license file is present; add one if you plan to distribute or open-source the project.
