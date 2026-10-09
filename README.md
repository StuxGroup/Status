<p align="center">
  <picture><source media="(prefers-color-scheme: dark)" srcset="https://global.media.stux.group/logo-light.png"><source media="(prefers-color-scheme: light)" srcset="https://global.media.stux.group/logo-dark.png"><img src="https://global.media.stux.group/logo-dark.png" height="100" alt="Stux.Group Logo"></picture>
</p>

# Status

### *Live status of Stux.Group's websites and services, powered by [GitHup](https://githup.stux.group).*

**Status page:** [status.stux.group](https://status.stux.group)

<!-- A live badge: reads the overall status straight from data/summary.json. -->
[![Stux.Group status](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2FStuxGroup%2FStatus%2Fmain%2Fdata%2Fsummary.json&query=%24.status&label=status&style=for-the-badge)](https://status.stux.group)

## Current status

Updated by GitHup whenever the status page is rebuilt (hourly, and when a status changes).

<!-- githup:start -->
<!-- This table is written by GitHup (https://github.com/StuxGroup/GitHup); edits here are overwritten. -->

**All systems operational** · [Live status page](https://status.stux.group/)

| Group | Monitor | Status | Uptime (24 h) | Uptime (7 d) | Uptime (30 d) | Response time (24 h) |
| ----- | ------- | ------ | ------------- | ------------ | ------------- | -------------------- |
| Stux.Group | [Stux.Group](https://stux.group/) | Up | 100.00% | 99.59% | 99.70% | 710 ms |
| Stux.Group | [Stux.Group Services](https://services.stux.group/) | Up | 100.00% | 100.00% | 100.00% | 235 ms |
| Stux.Group | [Stux.Group Media CDN](https://global.media.stux.group/icon.png) | Up | 100.00% | 100.00% | 100.00% | 467 ms |
| Brands | [Stux.Cloud](https://stux.cloud/) | Up | 100.00% | 99.59% | 99.68% | 351 ms |
| Services & tools | [GitHup](https://githup.stux.group/) | Up | 100.00% | 100.00% | 100.00% | 263 ms |
<!-- githup:end -->

## What's monitored

Every 5 minutes (when GitHub runs the schedule late, a run checks up to 4 times, 5 minutes apart, to fill the gap), GitHup checks each monitor in [`.githup.yml`](.githup.yml), shown on the page
in four groups (the last is links only):

- **Stux.Group:** Stux.Group, Stux.Group Services and the Stux.Group media CDN
- **Brands:** Stux.Group brands without a status page of their own yet (now just Stux.Cloud)
- **Services & tools:** GitHup
- **Elsewhere:** links to every brand's own status page, in the Stux.Group website's order
  (Stuxedo, with its servers and their certificates, and Stuxedo's web hosting status; Stux.Dev;
  StuxAPIs; Stux.Music; Stux.Digital; Stux.Design; Stux.Games), then Ream.st Status

The servers and their certificate checks moved to [Stuxedo Status](https://status.stuxedo.net)
on 9 October 2026, with their history; the Stuxedo and Stux.Cloud region pages read them there.

To add a service, add a monitor to the right group there (or a new group).

When a service goes down, GitHup opens an Issue on this repository (labelled `githup`,
`incident`, `status` and the monitor's slug) and closes it with the downtime when it recovers.
To announce planned maintenance, open an Issue yourself with the `githup` and `incident` labels
(plus the monitor's slug to link it); it shows on the status page.

## How it works

- **`.github/workflows/status.yml`** runs a GitHup `check` every 5 minutes (with `fill-gaps`, up to 4 checks when the schedule is late) and commits the
  results to `data/` as `github-actions[bot]`. When a status changes, hourly, and on pushes, it
  builds the GitHup status page into `_site` (with `site-dir`), and deploys it with `actions/deploy-pages`.
- **`legal:` in `.githup.yml`** (operator, company, contact, host, effective date) makes GitHup
  generate the **Boring Legal Stuff** hub at `/legal/` with its six sub-pages, a themed `404.html`, a
  `/sitemap/` page, `sitemap.xml` and `robots.txt` (the base URL is `site.url`). Nothing is hand-made: the
  footer shows only **Powered by GitHup vX.Y.Z**, linking to
  [GitHup's changelog](https://githup.stux.group/changelogs/#githup), so GitHup's is the one version and
  changelog on the page. This repo's own `CHANGELOG.md` and `VERSION.md` are for this repo only.
- **`data/`** is the monitoring history. Don't edit it by hand.
- **The status table above** is written by GitHup's `readme` mode between the
  `<!-- githup:start -->` and `<!-- githup:end -->` markers. Don't edit inside them.

## Local development

```bash
./dev-server.sh                 # or dev-server.bat on Windows; add a port as the last argument
./dev-server.sh --no-dev-mode   # production rendering
```

`dev-server` generates 90 days of example data, builds the status page into `.dev/public` with
`DEV_MODE` on, with its legal pages, 404 and sitemap, and serves it at `http://127.0.0.1:8000`. It uses GitHup from
`$GITHUP_PATH`, a sibling `../GitHup` checkout, or a fresh clone in `.dev/GitHup`.

## Hosting

GitHub Pages, deployed by Actions (**Settings → Pages → Source: GitHub Actions**), with the custom
domain `status.stux.group` set in the Pages settings. DNS: a `CNAME` record for `status` pointing
at `stuxgroup.github.io`.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

The code in this repository is MIT, copyright © Stux.Group, see [LICENSE](LICENSE). The
Stux.Group name, logos and branding are not covered by the license.

---

*Built & maintained by <img src="https://github.com/StuxGroup.png" height="14" alt="Stux.Group" valign="middle"> [Stux.Group](https://github.com/StuxGroup), powered by [GitHup](https://githup.stux.group), a Stux.Group Service.  
Stux.Group is the parent of the <picture><source media="(prefers-color-scheme: dark)" srcset="https://global.media.stux.group/icon-light.png"><source media="(prefers-color-scheme: light)" srcset="https://global.media.stux.group/icon-dark.png"><img src="https://global.media.stux.group/icon-dark.png" height="14" alt="Stux.Group" valign="middle"></picture> Stux.Group Brand of Companies.*
