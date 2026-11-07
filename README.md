# South Slope Restaurant & Bar

Website for South Slope Restaurant & Bar (also known as South Slope Eatery), an all day American
restaurant and bar at 486 5th Avenue, Brooklyn, NY 11215. Breakfast, lunch and dinner from 9:00 AM,
fresh squeezed juices and smoothies, wraps, bowls, burgers, entrees and cocktails.

The site replaces the old Wix site at southslopeeatery486.com. It is a four page, English only site:
home, the full text menu, about, and contact with hours, directions and ordering links.

Built by Novus. See `BUILD_NOTES.md` for sources, decisions and open items for the owner.

## Stack

- Next.js 16 (App Router), TypeScript strict, Tailwind CSS v3, `next/image`
- Self-hosted fonts from Fontsource: Fraunces Variable (display) and Inter Variable (text)
- ESLint 9 with `eslint-config-next` (flat config in `eslint.config.mjs`)
- No database, no forms backend. The contact form opens the visitor's mail app (`mailto:`).

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
npm run lint       # eslint .
npm run typecheck  # tsc --noEmit
```

`npm install` sometimes stalls on Windows. If it hangs for more than a few minutes, cancel and run
it again.

## Where things live

| What | Where |
| --- | --- |
| Business facts: name, address, phone, email, hours, ordering links, rating, reviews | `src/lib/site.ts` |
| The menu (every section, category, item, price, vegan and vegetarian tags) | `src/lib/menu.ts` |
| Per-route metadata helper (title, description, canonical, Open Graph, Twitter) | `src/lib/metadata.ts` |
| Pages | `src/app/page.tsx`, `src/app/menu`, `src/app/about`, `src/app/contact`, `src/app/not-found.tsx` |
| Header, mobile menu, footer, reveals, buttons, hours table, ordering links, JSON-LD | `src/lib/components/` |
| Favicon, app icon, Open Graph image | `src/app/icon.svg`, `src/app/apple-icon.tsx`, `src/app/opengraph-image.tsx` |
| Photos (copied byte for byte from the owner's sources) | `public/images/` |
| Design tokens (colors, fonts) | `tailwind.config.ts`, `src/app/globals.css` |
| Redirects from the old Wix URLs | `next.config.ts` |

To change hours, phone or ordering links, edit `src/lib/site.ts` only; the footer, contact page,
home page and JSON-LD all read from it. Anything set to `null` there hides its UI.

To change a price or add a dish, edit `src/lib/menu.ts`. Items the home page features are chosen in
`featured` at the bottom of that file and must match a real item name.

## Deployment

Deploy on Vercel (or any Node host) from `main`. Set `NEXT_PUBLIC_SITE_URL` to the production URL
(for example `https://southslope.com`) so canonical URLs, Open Graph URLs, the sitemap and robots.txt
point at the live domain. Without it the site falls back to `https://example.com` in metadata only.

When the old Wix site is taken down, the "Order Online" link (which points at the Wix ordering page)
must be replaced in `src/lib/site.ts`. See the open items in `BUILD_NOTES.md`.
