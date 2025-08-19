# Bettor Days — Next.js Starter

A one-file landing page for your Whop sports betting group.

## Quick Start (Local)

1. **Install Node.js 18+** (https://nodejs.org)
2. Unzip this folder, then open a terminal in it
3. Install packages:
   ```bash
   npm install
   ```
4. Run the dev server:
   ```bash
   npm run dev
   ```
5. Open http://localhost:3000

- The big green button links to your Whop product: `https://whop.com/rakko-was-board`
- To add your photos: put images into `/public` and edit the `images` array in `app/page.tsx`

## Deploy to Vercel (fastest)

1. Create a GitHub repo for this folder and push it
2. Go to https://vercel.com → **New Project** → Import your repo → Deploy (defaults are fine)
3. You’ll get a live URL like `https://bettor-days.vercel.app`

## Embed inside Whop (optional, Website Embed)

This project sets a Content-Security-Policy header that **allows Whop** to iframe your site.

1. In the Whop dashboard: **Your whop → Tools → Add App → Website Embed**
2. Paste your live site URL (from Vercel) and save
3. Your site shows up as a tab/app inside Whop

If the embed doesn’t load, make sure your deployment includes the `frame-ancestors 'self' https://*.whop.com` header (already configured in `next.config.mjs`).

## Change the checkout link

Edit the `<a href="...">` in `app/page.tsx` if your product URL changes.

## Notes

- No custom component libraries needed; only `framer-motion` + `lucide-react`
- Mobile-first with a centered CTA and safe-area padding
- TailwindCSS is preconfigured

Enjoy! 🎯
