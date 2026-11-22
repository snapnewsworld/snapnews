# Snap News

Global politics and economics, in plain English. A static site built with [Astro](https://astro.build),
hosted free on GitHub Pages.

## Writing an article

1. Go to `src/content/articles/`.
2. Copy `_TEMPLATE.md` and rename the copy. The filename becomes the web address, for example
   `rent-prices-2026.md` becomes `/articles/rent-prices-2026/`.
3. Fill in the details at the top (title, subtitle, type, regions, sources and so on). Set `draft: false` when it's ready.
4. Commit to `main`. The site rebuilds and publishes itself in about a minute.
   Committing to any other branch works too: `.github/workflows/sync-articles.yml` builds it and, if the
   build passes, merges it into `main` and deploys it automatically. A broken article is stopped, not published.

You can do all of this in the GitHub website or app, with no computer setup needed.

| Field       | What it does |
|-------------|--------------|
| `type`      | `snap` (short), `analysis` (long) or `explainer` (guide) |
| `regions`   | which World News region pages it appears on (one or more) |
| `topics`    | `economy` and/or `politics` |
| `takeaways` | bullet points shown in "The short version" box |
| `sources`   | links listed under the article |
| `featured`  | `true` pins it as the big lead story on the home page |
| `draft`     | `true` hides it from the live site |

### Glossary words

Add terms to `src/content/glossary.yaml`, then mark a word in any article as a link:
`[the wording you want](glossary:term-id)`. Readers tap or click it to see the definition, and every
term is listed on the Glossary A–Z page under Explained.

Before launch, delete the three `sample-*.md` articles and the sample glossary terms.

## Contact address and bot protection

Put the site's contact email (one made only for Snap News) in `contactEmail` in `src/consts.ts`.
It never appears in the page as plain text: the Contact page scrambles it, and a visitor reveals it
by pressing and holding a button for a second. Spam bots that harvest addresses from page source get
nothing. `public/robots.txt` also asks AI-training scrapers to stay away.

GitHub Pages serves plain files, so there are no forms or comments for bots to flood. If comments or
a newsletter signup are added later, pick a provider with its own spam protection.

## Running it on your computer (optional)

```bash
npm install
npm run dev       # live preview at http://localhost:4321/snapnews/ (drafts visible)
npm run build     # build the real site into dist/ (includes the search index)
```

## Where things live

| Path | What |
|------|------|
| `src/consts.ts` | site name, tagline, author, regions, topics |
| `src/components/Sidebar.astro` | the side menu and World News dropdown |
| `src/pages/` | every page (home, world, regions, economy, politics, explained, about, search) |
| `src/styles/global.css` | colours, fonts and layout |
| `.github/workflows/deploy.yml` | automatic publishing to GitHub Pages |

## Security and privacy

- Static site: no server, database or admin login to attack.
- Strict Content-Security-Policy: only the site's own files can load. No trackers, ads or third-party scripts.
- Search (Pagefind) runs entirely in the reader's browser.
- Commits are made as "Snap News" with the account's GitHub `noreply` email, with times rounded to midnight UTC.
- Dependabot keeps dependencies patched.
