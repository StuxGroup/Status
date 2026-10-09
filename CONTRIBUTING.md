<p align="center">
  <picture><source media="(prefers-color-scheme: dark)" srcset="https://global.media.stux.group/logo-light.png"><source media="(prefers-color-scheme: light)" srcset="https://global.media.stux.group/logo-dark.png"><img src="https://global.media.stux.group/logo-dark.png" height="80" alt="Stux.Group Logo"></picture>
</p>

# Contributing to Status

Status is Stux.Group's own status page, [status.stux.group](https://status.stux.group), built
with GitHup, [a Stux.Group Service](https://services.stux.group). To report an outage, open an
Issue. Bugs or ideas for the status page software belong in
[StuxGroup/GitHup](https://github.com/StuxGroup/GitHup/issues).

## Local setup

You need Python 3.11+ and nothing else.

```bash
./dev-server.sh [--no-dev-mode] [port]   # or dev-server.bat on Windows
```

## Project conventions

- **Monitors live in `.githup.yml`.** Its syntax is documented in the
  [GitHup README](https://github.com/StuxGroup/GitHup#config-reference). Only add services
  Stux.Group runs.
- **The status page itself is GitHup's.** Change how it looks or works in GitHup, not here.
  `site/` only holds the `/legal` pages and `404.html`, which share `site/assets/pages.css` and
  `pages.js`. Their header and footer are repeated in every page; change them all together.
- **Legal pages.** Every page's footer links to **Boring Legal Stuff** at `/legal/`, which links
  to Privacy Policy, Terms and Ethics, Cookies Policy, Imprint, Disclaimer and Opt-Out
  Preferences. Keep them accurate.
- **Don't edit `data/` by hand.** It belongs to GitHup and the workflow.

## Versioning and changelog

- The version lives in `VERSION.md` (a bare version string). Bump it on every release.
- Every release gets a `CHANGELOG.md` entry using `###` subsections in this order: Added,
  Changed, Fixed, Removed, Security, Deprecated. Never a bare bullet list under a version.
- `commit.sh` (bash) and `commit.bat` (Windows) read `VERSION.md`, commit and create the
  annotated `vX.Y.Z` tag. Push with `git push origin main vX.Y.Z`.
