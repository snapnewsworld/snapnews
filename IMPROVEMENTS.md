# Snap News improvement backlog

Worked through one item at a time by the `site-improve` skill (`.claude/skills/site-improve/`).
Add ideas to the Backlog in priority order. The loop takes the top unchecked item.

## Backlog

- [ ] **Fix the RSS link (reported broken).** `/rss.xml` is valid, but browsers show an error, a download or raw XML when readers click it. Make the sidebar "RSS feed" link (and any other visible feed links) go to a new friendly HTML page `/feed/` ("Follow Snap News"): explains RSS in two sentences, shows the feed URL with a copy button, one-tap subscribe links for popular readers (Feedly, Inoreader, NewsBlur, The Old Reader, plus a `feed:` link), and a link to the raw XML. Keep `/rss.xml` for feed readers and the `<link rel="alternate">` tag. Also upgrade the feed itself: full article HTML in `content:encoded`, `atom:link rel="self"`, `<language>`, `<lastBuildDate>`, channel `<image>`, and per-section feeds (`/economy/rss.xml`, `/politics/rss.xml`, `/world/<region>/rss.xml`) listed on `/feed/`. Validate every feed parses as XML in the verify step.
- [ ] Self-hosted typography: add a high-quality open-licence serif and sans (e.g. Source Serif 4 and Inter via `@fontsource-variable` npm packages, woff2 only, `font-display: swap`, subset to Latin) so the site looks the same on every device. No external font CDNs.
- [ ] Light/dark theme toggle in the sidebar (system / light / dark), remembered in localStorage, no flash of the wrong theme (script in an external file loaded early; keep the CSP strict).
- [ ] Corrections support: optional `correction` field in the article schema, shown as a notice at the top of the article, and a `/corrections/` log page.
- [ ] Build-time charts: a `<Chart>` component for MDX or a fenced ```chart block that renders an accessible SVG (bar/line) from inline CSV at build time, no client JavaScript, with a data table fallback and source line.
- [ ] Accessibility audit with axe-core in Playwright (dev dependency) across every page type, light and dark; fix every violation; add it to CI.
- [ ] Performance and quality budget in CI: Lighthouse (using the preinstalled Chromium) on home, an article and the glossary; fail below 95 performance / 100 accessibility / 100 best practices / 100 SEO.
- [ ] Internal link checker in CI: crawl `dist/` and fail on any broken internal link or missing anchor.
- [ ] Structured data: `Organization` + `WebSite` (with SearchAction pointing at /search/?q=) on the home page, `BreadcrumbList` on articles and section pages.
- [ ] Series support: optional `series` field, a series landing page, and "Part N of M" plus "Next in this series" links.
- [ ] Archive page listing all articles by month, linked from the footer of the sidebar.
- [ ] Previous/next article links at the end of each article.
- [ ] Print stylesheet for articles (hide navigation and share buttons, show link URLs and sources).
- [ ] Strip EXIF/location metadata from article images automatically (Astro image pipeline) and document how to add images in the README.
- [ ] Home page polish: stronger visual hierarchy (lead story, secondary stories, "Explained" rail), empty states that look intentional, and a subtle animated spark on the lead kicker (respecting reduced motion).

## Needs owner

- Contact address: create a Proton Mail address only for Snap News and put it in `contactEmail` in `src/consts.ts`.
- Newsletter provider choice (Buttondown, Substack, Beehiiv, ...) before a signup form can be added.
- Custom domain (then update `site`/`base` in `astro.config.mjs` and `public/robots.txt`).
- Social media account links for the footer.

## Done

- [x] 2026-11-17: Moved to an anonymous home with clean history, neutral commit identity and no personal details.
- [x] 2026-11-17: Snap Check bot protection: the contact address is scrambled in the page and only revealed by a real press-and-hold from a human (`SnapCheck.astro`, `/contact/`).
- [x] 2026-11-17: robots.txt blocks AI-training and bulk-scraping crawlers; pages send `noai` and `no-referrer`.
- [x] 2026-11-17: Creative touches: app-like page transitions (native, no JS), spark logo bursts on hover, the reading bar "snaps" when you finish an article, press `/` anywhere to search, and a tap-to-snap toy on the 404 page.
- [x] 2026-11-09: Per-article share images. `/og/<article>.png` (1200x630) is drawn at build time from the headline, type, region, byline and date, and used for `og:image` and the article's structured data. Added dependency: `sharp` (pinned to the version Astro already installs) to turn the SVG into a PNG. Uses DejaVu fonts, which GitHub's build machines have.
- [x] 2026-11-09: Glossary. Terms live in `src/content/glossary.yaml`; `[wording](glossary:id)` in an article becomes a tap/click definition card (native `popover`, no JavaScript); A–Z page at `/explained/glossary/`. Added dependencies: `yaml` (read the glossary at build time) and `@astrojs/markdown-satteri` (Astro's Markdown engine, to register the plugin); both were already installed by Astro.
- [x] 2026-11-09: "In this piece" table of contents on analysis articles with 3+ subheadings (`TableOfContents.astro`, no JavaScript).
- [x] 2026-11-09: Reading progress bar on article pages (`ReadingProgress.astro`): fixed, transform-only, no layout shift, no animation under reduced motion.
- [x] 2026-11-09: CI build check on every push to non-main branches and every pull request (`.github/workflows/ci.yml`).
- [x] 2026-11-09: Initial site: sidebar with World News regions dropdown, sections, article pages, search, RSS, sitemap, CSP, deploy workflow.
