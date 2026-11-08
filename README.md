This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Turso database setup

The application automatically creates and upgrades its required tables on the first API request. `database/schema.sql` is also available for manually creating a new Turso database.

For an existing database, [`database/migrations/001_customer_accounts.sql`](./database/migrations/001_customer_accounts.sql) contains the equivalent one-time SQL migration if you prefer to set up the tables manually. The runtime bootstrap also upgrades an existing `orders` table without deleting orders.

The app uses `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` for Turso, and `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER` and `SMTP_PASS` for email. Order notifications go to `SMTP_USER`.

## Admin credentials

Set `ADMIN_USERNAME` and `ADMIN_PASSWORD` in local and Vercel environment settings before using `/admin`. Use a unique random password with at least 32 characters. The previous hard-coded admin credentials are no longer accepted. Admin and customer sessions are stored hashed in Turso and use HTTP-only cookies.

Customer accounts can be used immediately after registration. Passwords must contain at least 8 characters. Order history is available only to the authenticated customer who placed the order; guest orders remain visible only in the admin area.

## Build and lint

```bash
npm run build
npm run lint
```
