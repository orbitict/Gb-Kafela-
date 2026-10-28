# গ্রীন বাংলা হজ কাফেলা — Website

Bengali Hajj agency website with an admin panel (`/admin`).

**Stack:** TanStack Start · React 19 · TypeScript · Tailwind CSS 4 · Supabase

## Setup

```sh
npm install
cp .env.example .env   # fill in your Supabase URL + publishable key
npm run dev            # http://localhost:3000
```

## Database

Run the SQL files in `drizzle/migrations/` **in order** in the Supabase SQL Editor
(`0000` → `0001` → `0002`). Skip any you have already run.

Make a user admin (after they sign up at `/admin`):

```sql
update auth.users set email_confirmed_at = now()
where email = 'you@example.com' and email_confirmed_at is null;

insert into public.user_roles (user_id, role)
select id, 'admin' from auth.users where email = 'you@example.com'
on conflict do nothing;
```

Then disable **Allow new users to sign up** in Supabase → Authentication.

## Scripts

| Command             | What it does                  |
| ------------------- | ----------------------------- |
| `npm run dev`       | Dev server                    |
| `npm run build`     | Production build (`.output/`) |
| `npm run preview`   | Preview the build             |
| `npm run lint`      | ESLint                        |
| `npm run typecheck` | TypeScript check              |
| `npm test`          | Unit tests (Vitest)           |

## Deploy

Works on Vercel, Netlify or Cloudflare (Nitro auto-detects the host).
Set these environment variables on the host:

- `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`
