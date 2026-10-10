# Kirabo Journeys website

React (Vite) site for sacred, heritage, cultural and immersion journeys across Uganda, Kenya, Tanzania, Rwanda, Burundi, Ethiopia, DR Congo and South Sudan.

"Kirabo Journeys" is a placeholder name. Change it, plus phone, WhatsApp, email and licence number, in `src/data/content.js` (`BRAND`) and the `<title>` in `index.html`.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
```

## Deploy to Netlify

**Option A, from Git (recommended):** push this folder to GitHub, then in Netlify choose *Add new site → Import an existing project*. `netlify.toml` already sets the build command (`npm run build`), publish folder (`dist`) and the redirect that makes page links work.

**Option B, drag and drop:** run `npm run build`, then drag the `dist` folder onto app.netlify.com/drop. (Use Option A if you want the enquiry form to collect submissions, since Netlify detects forms at build time.)

Enquiries arrive in Netlify under *Forms → enquiry*. Set up email notifications there.

## Site structure

| Page | Route | What it shows |
| --- | --- | --- |
| Home | `/` | Hero, paths, featured and off-the-beaten-track packages, countries |
| Path pages | `/paths/sacred` `heritage` `culture` `immersion` `fun` | Overview and selling points, then packages grouped by country with **See all** |
| Where We Go | `/where-we-go` | Overview, then every package grouped by country |
| Country | `/countries/uganda?path=sacred` | Full list for one country, filterable by path, people, region, faith, length and off-the-beaten-track; forgotten places; peoples |
| Package | `/packages/busoga-kingdom-trail` | Full day-by-day itinerary, inclusions, peoples, combine-with suggestions, enquiry |
| Peoples | `/peoples`, `/peoples/acholi` | Directory by country and region; profiles (names, food, worship, dress, way of life, today) and their packages |
| Plan, Promise, FAQ, About, Contact | `/plan` etc. | Enquiry form (Netlify Forms) and supporting pages |

Filters live in the URL, so any filtered view can be linked or shared.

## Editing content

All content is in `src/data/`:

- `packages/*.js`: one file per country group. Each package has `paths`, `peoples`, `faiths`, `region` and `offbeat` tags; filters and path pages read these automatically, so a package appears everywhere it belongs.
- `peoples.js`: every people, with an optional full profile.
- `sites.js`: sacred, cultural and forgotten places shown on country pages.
- `countries.js`, `paths.js`, `content.js`: country intros, path overviews, FAQ, promise and other copy.

To add photos, put images in `public/images/` and set `image: '/images/lamu.jpg'` on a package. Cards then show the photo instead of the pattern.

## Moving to Supabase

`supabase/schema.sql` creates tables that match the data files (countries, paths, peoples, packages, sites, enquiries) with read-only public access. All data reads go through `src/lib/api.js`, so switching to Supabase means changing that one file to query the tables instead of importing local files.
