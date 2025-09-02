# My Free Store (Next.js 14 + Prisma + Vercel Free Stack)

Student‑friendly, zero‑cost stack:
- Next.js 14 (App Router) + Tailwind
- Prisma ORM + Vercel Postgres (free)
- NextAuth (Credentials) for admin login
- Vercel Blob (free) for product images
- COD (Cash on Delivery) checkout; no paid providers

## Quick Start (Local)

```bash
npm i
cp .env.example .env   # set DATABASE_URL to your local Postgres or Vercel Postgres
npm run prisma:push
npm run seed
npm run dev
```
Admin login: **admin@example.com / Admin@123** (change in `prisma/seed.ts`)

## Deploy to Vercel (Free)

1. Push this folder to a GitHub repo.
2. Import repo in Vercel → Framework: **Next.js**.
3. Vercel → **Storage** → create **Postgres** (free) and **Blob** (free).
4. In Vercel Project → Settings → Environment Variables:
   - `DATABASE_URL` (from Postgres)
   - `NEXTAUTH_SECRET` (use Vercel "Generate")
   - After first deploy, set `NEXTAUTH_URL=https://<your-app>.vercel.app` and redeploy.
5. Locally run once (or via a Vercel Job) to initialize DB:
   ```bash
   npm run prisma:push
   npm run seed
   ```

## Features
- Announcement ticker, simple hero, "New Launch" & "Sale" sections.
- Product cards with Sale/Sold out badges.
- Client‑side cart (localStorage) + COD checkout (creates Order in DB).
- Minimal Admin: list, create, edit, delete products; upload image to Vercel Blob.
- Collections: `new-launch` and `sale` seeded by default.

## Notes
- Prices stored as integer Tk (BDT).
- For production harden auth/authorization checks as needed.
- Add more collections/sections by creating new rows and querying them on the homepage.
