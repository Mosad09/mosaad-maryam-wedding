# مسعد & مريم — Wedding Invitation

A luxury, cinematic wedding invitation website: envelope + wax-seal opening
sequence, Arabic/English bilingual content with full RTL support, dark mode,
countdown, event sections, gallery, guestbook, FAQ, share/calendar/QR tools —
built as a fully static site for GitHub Pages.

## Tech stack

- React 18 + Vite
- Tailwind CSS (dark mode via `class`)
- Framer Motion (all animations)
- Swiper (gallery carousel)
- `qrcode` (client-side QR generation, no backend)

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview   # preview the production build locally
```

## Project structure

```
src/
├── assets/                (not used directly — see public/assets below)
├── components/             All UI components
├── context/                ThemeContext (dark mode), MusicContext (audio)
├── i18n/                   LanguageContext + translations.js
├── data/weddingData.js     ALL wedding content lives here
├── hooks/useLocalStorage.js
├── App.jsx
├── main.jsx
└── index.css

public/
├── assets/images/childhood/   Two childhood photos (groom + bride)
├── assets/images/gallery/     Gallery + hero + photo-story images
├── assets/images/events/      Engagement / Katb Ketab / Wedding photos
├── assets/music/               wedding-song.mp3
├── favicon.svg, manifest.json, robots.txt, sitemap.xml
```

## Editing the wedding content

Everything — names, dates, times, venue, events, gallery, FAQ, contacts,
schedule, SEO text — lives in **`src/data/weddingData.js`**. Update the
fields there; no component code needs to change.

To change **names**: edit `couple.groom` / `couple.bride` (`nameAr`, `nameEn`)
and `couple.monogram`.

To change **dates**: edit `countdownDateISO` (ISO datetime used by the live
countdown) and the display strings in `weddingDateDisplay`, plus each event's
`date` / `time` fields under `events`.

To change **photos**: drop files into the matching folder under
`public/assets/images/...` and update the `src`/`photo` paths in
`weddingData.js` to match.

To change **music**: replace `public/assets/music/wedding-song.mp3` (or
update `music.src` in `weddingData.js` to a different filename).

To change **locations**: edit `venue`, and each event's `location` /
`address` / `mapLink` / `mapEmbedUrl`. Get a Google Maps embed URL from
Google Maps → Share → Embed a map.

To change **colors**: edit `tailwind.config.js` under `theme.extend.colors`
(gold, champagne, warmwhite, ivory, beige, charcoal, dark).

To change **text/translations** (buttons, labels, section titles): edit
`src/i18n/translations.js` (both `en` and `ar` objects).

## Language & RTL

Default language is English. The switcher in the navbar toggles to Arabic,
which sets `dir="rtl"` on `<html>` and swaps the body font. The preference
persists in `localStorage`.

## Dark mode

Toggled from the navbar; persists in `localStorage` and respects the
system preference on first visit.

## Music

A single `Audio` instance lives in `MusicContext` and is created once, so it
never restarts when navigating or switching language/theme. Playback starts
on the "Open Invitation" click (a real user gesture, required by mobile
browsers that block autoplay). If playback fails, the site keeps working —
the floating music button lets the guest start it manually.

## Guestbook

Stores wishes (name + message) in `localStorage` only — no backend, no
attendance question.

## Deploying to GitHub Pages

1. Push this project to a GitHub repository, e.g. `mosaad-maryam-wedding`.
2. In `vite.config.js`, set `base` to match your repo name exactly:
   ```js
   base: "/mosaad-maryam-weeding/"
   ```
   (If deploying to a `USERNAME.github.io` root repo instead, use `base: "/"`.)
3. In your repo settings → **Pages**, set the source to **GitHub Actions**.
4. Push to `main` — `.github/workflows/deploy.yml` builds and deploys
   automatically. Your site will be live at:
   `https://USERNAME.github.io/mosaad-maryam-wedding/`
5. Update `robots.txt` and `sitemap.xml` in `public/` with your real URL.

Alternatively, deploy manually with the `gh-pages` package:

```bash
npm run deploy
```

## QA checklist before sharing the link

- [ ] `npm run build` completes with no errors
- [ ] No horizontal scroll on a 390px-wide screen
- [ ] Arabic names render in Aref Ruqaa Ink (check the hero and invitation card)
- [ ] Switching to العربية flips the whole layout to RTL, all text translates
- [ ] Music starts on "Open Invitation" tap and doesn't restart on scroll/nav
- [ ] Dark mode toggle persists on reload
- [ ] Countdown updates live and shows the "today" message after the date
- [ ] Gallery swipes correctly on mobile
- [ ] Guestbook entries persist after a page reload
- [ ] Share button copies the link (or opens native share sheet) with a toast
- [ ] "Add to Calendar" downloads a valid `.ics` file
- [ ] QR code renders and points to the live URL
- [ ] All real photos and the music file have been dropped into `public/assets/`
