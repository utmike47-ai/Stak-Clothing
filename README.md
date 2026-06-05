# STAK — Style That Always Keeps

Marketing site for STAK Supply Co. Built with [Astro](https://astro.build) for fast static pages and easy deployment.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage — hero, story, Drop 001, editorial, journal preview |
| `/shop` | Full product grid |
| `/shop/[slug]` | Product detail pages |
| `/journal` | Journal index |
| `/journal/[slug]` | Journal articles |

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

## Production build

```bash
npm run build
npm run preview
```

Static output is written to `dist/`.

## Deploy

**Vercel** — connect the repo; `vercel.json` is included.

**Netlify** — build command `npm run build`, publish directory `dist`.

Update `site` in `astro.config.mjs` when your domain is final (currently `https://www.stakclothing.com`).

## Project structure

```
src/
  components/   Nav, Footer, ProductCard, etc.
  data/         Products and journal posts
  layouts/      BaseLayout with SEO meta
  pages/        Routes
  styles/       Global CSS (your original design)
public/
  favicon.svg, scripts/site.js
```

## Next steps

- Connect newsletter form (e.g. Klaviyo, Buttondown)
- Add real product photography under `public/images/`
- Wire checkout (Shopify, Stripe, etc.)
- Replace placeholder social URLs in the footer
