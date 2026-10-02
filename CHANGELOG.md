# Changelog

All notable changes to Stux.Group's status page (status.stux.group) are documented here. It
follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## v1.8.0

### Added

- down1 (United States) in the Servers group: an up/down monitor for its instance page and its certificate check, now that it runs a web server like the other Stux.Cloud servers

## v1.7.0

### Added

- Up/down monitors for the Stux.Cloud servers robo1, tiny1, kitt1 and mixr1 (their instance pages), which the Stux.Cloud and Stuxedo region pages read for live status

### Changed

- The "Server certificates" group is now "Servers", holding each server's monitor and its certificate monitor (history is kept)

## v1.6.0

### Added

- A "Server certificates" group with a monitor for each Stux.Cloud server (robo1, tiny1, kitt1 and mixr1). Each server checks daily that every certificate it uses has more than 21 days left and publishes `certificates-ok.txt` while it does, so an expiring certificate shows as down and opens an incident Issue

## v1.5.1

### Changed

- `max_response_time` raised to 15 seconds (GitHup's new default), so a slow but working site is no longer shown as degraded

## v1.5.0

### Added

- A Ream.st Status link in the Elsewhere section

### Removed

- The Ream.st, Multi.st Twitch and Multi.st YouTube monitors: moved to Ream.st's own status page, status.ream.st

## v1.4.9

### Added

- An "Elsewhere" link section pointing to Stux.Dev Status, StuxAPIs Status and Stux.Music Status, for the services checked on their own brand's page

### Changed

- The Services group is now "Services & tools", matching services.stux.group, and holds GitHup, Multi.st Twitch and Multi.st YouTube
- Ream.st moved to Brands, and the Streaming group is gone (monitor history is kept)

## v1.4.8

### Changed

- GitHup moved from the Brands group to a new Services group, since it is a service, not a brand (its history is kept)

## v1.4.7

### Added

- A Stux.Cloud monitor (stux.cloud) in the Brands group, so its card on services.stux.group can show a live badge

## v1.4.6

### Removed

- The StuxAPIs group (SeasonalOverlaysLibrary, Kittens and SecretGen): moved to status.stuxapis.net

## v1.4.5

### Added

- A "StuxAPIs" group monitoring SeasonalOverlaysLibrary, Kittens and SecretGen (Lunar Calendar is not monitored because its site does not serve yet)

## v1.4.4

### Fixed

- A double blank line in `CHANGELOG.md`, so the Markdown files pass markdownlint

## v1.4.3

### Changed

- Opted in to GitHup v1.8.0's `fill-gaps` option (`repeat: 4`, `repeat-interval: 300`): when GitHub runs the 5-minute schedule late, a run now checks up to 4 times, 5 minutes apart, instead of once. A run that is on time still checks once. GitHub often runs the 5-minute schedule only every few hours. The check job's timeout is now 25 minutes

## v1.4.2

### Removed

- The copyright line in the status page footer: `site.copyright` is no longer set, as status pages don't need one

## v1.4.1

### Added

- A copyright line in the footer (Copyright © START–CURRENT HOLDER), from the new `site.copyright` setting in `.githup.yml`; it needs GitHup 1.7.0 or later

## v1.4.0

### Added

- A `legal:` block in `.githup.yml` (operator, company, contact, host, effective date): GitHup generates the **Boring Legal Stuff** hub at `/legal/` and its six sub-pages, a themed 404 page, `sitemap.xml`, `robots.txt` and `/sitemap/`, all in the status page's own template (needs GitHup v1.6.0, picked up through `StuxGroup/GitHup@v1`)
- The sitemap's base URL comes from `site.url: https://status.stux.group/`

### Changed

- The status page comes entirely from GitHup's template, with one version and one changelog: the footer shows only **Powered by GitHup vX.Y.Z**, linking to GitHup's changelog
- `dev-server.sh`/`.bat` and the workflow no longer copy `site/`, `CHANGELOG.md` or `VERSION.md` into the page; the dev server still builds with the local GitHup checkout, so the new pages show locally

### Removed

- The hand-made `site/` folder: the legal hub and sub-pages, the `/changelogs/` page (and `/changelog/` redirect), the 404 page and their shared assets. This repo keeps its own `CHANGELOG.md`, `VERSION.md` and tags
- `site.changelog` (and `site.legal`) from `.githup.yml`; `site.changelog` is deprecated in GitHup v1.6.0

## v1.3.0

### Added

- A **Created with** line in the footer of the hand-made pages (`/legal/`, `/changelogs/`, the 404 page): a heart, code brackets and a coffee mug, by Stux.Group

### Changed

- The dev-mode banner on the hand-made pages is the shared Stux site banner: a muted strip in the page's colours with a label chip and a faint icon pattern, replacing the yellow hazard stripes. It stays at the top and pushes the page down by its exact height, so it never covers anything, including on phones. In dev mode, `?banner=soon,maintenance,site` previews the other banner styles
- The dev banner is switched on by `dev-server.sh`/`.bat` (they write `assets/dev-mode.js` into the local build) instead of by looking at the hostname, so `--no-dev-mode` now hides it everywhere; the old `?nodev=1` is gone
- The footer's **Powered by GitHup** and service links are muted until hovered or focused, and footer logos are 28px and fade in without the hover glitch (the same filter functions in every state)
- `dev-server.sh`/`.bat` use a local GitHup checkout (`../GitHup` or `../../Stux.Group/GitHup`) when there is one, so local previews show the newest GitHup
- Needs GitHup v1.5.0 for the status page's own new banner and muted footer (it's picked up through `StuxGroup/GitHup@v1`)

## v1.2.0

### Added

- A **Changelogs** page at `/changelogs/` with two tabs: this status page's own changelog (with its version) and GitHup's (read live from its `v1` release), with each release's sections sorted into a fixed order and coloured type badges; `/changelogs/#githup` opens the GitHup tab, and `/changelog/` redirects to `/changelogs/`, keeping the `#tab`
- `CHANGELOG.md` and `VERSION.md` are now published with the site (the workflow and both dev servers copy them in), and pushes that change them rebuild the page

### Changed

- Monitors are grouped on the status page and in the README table, using GitHup v1.4.0's `groups`: **Stux.Group** (Stux.Group, Stux.Group Services, the media CDN), **Brands** (Stux.Dev, Stuxedo, Stux.Music, GitHup) and **Streaming** (Ream.st, Multi.st Twitch, Multi.st YouTube); slugs are unchanged, so every monitor keeps its history
- The status page footer now shows the GitHup version that built it (from GitHup v1.4.0)
- The status page footer's first link is now this page's version (`v1.2.0`), linking to `/changelogs/` (GitHup v1.4.0's `site.changelog`), replacing the **Stux.Group** link
- The `/legal` and 404 pages' footers match the status page: the version link to `/changelogs/`, Status, Report a problem and Boring Legal Stuff, then **Powered by GitHup | A Stux.Group Service** in place of the Stux.Group logo

### Fixed

- The README table's "Live status page" link pointed at `https://stuxgroup.github.io/Status/`; the workflow now passes GitHup's new `site-url` input so it links to `https://status.stux.group/`

### Removed

- The **All services** footer link, from the status page and the static pages; the footer's **A Stux.Group Service** link already goes there

## v1.1.0

### Added

- A **Current status** table in the README, kept up to date by GitHup's `readme` mode on every status page build: each service's status, 24 h / 7 d / 30 d uptime and 24 h response time, with a link to status.stux.group

## v1.0.0

### Added

- status.stux.group, a GitHup status page for Stux.Group's websites and services: Stux.Group, Stux.Group Services, the Stux.Group media CDN, Stux.Dev, Stuxedo, Stux.Music, Ream.st, Multi.st Twitch, Multi.st YouTube and GitHup, checked every 5 minutes
- `.github/workflows/status.yml`: a GitHup `check` every 5 minutes with incident Issues, then a build into `_site` with GitHup's `site-dir` input, deployed with `actions/deploy-pages` when a status changes, hourly and on pushes
- The **Boring Legal Stuff** hub at `/legal/` with Privacy Policy, Terms and Ethics, Cookies Policy, Imprint, Disclaimer and Opt-Out Preferences, and a `404.html`, styled to match the status page in light and dark themes
- A live status badge in the README, read from `data/summary.json`
- `dev-server.sh`/`dev-server.bat` that build the page from generated example data into `.dev/public` and serve it locally with `DEV_MODE` on by default (`--no-dev-mode` to opt out)
- `commit.sh`/`commit.bat` release scripts that read `VERSION.md` and tag `vX.Y.Z`
