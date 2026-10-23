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
  GitHup also generates the `/legal` pages, `404.html` and the sitemap from `.githup.yml`; nothing
  on the site is hand-made in this repo.
- **Legal pages.** Every page's footer links to **Boring Legal Stuff** at `/legal/`, which links
  to Privacy Policy, Terms and Ethics, Cookies Policy, Imprint, Disclaimer and Opt-Out
  Preferences. Keep them accurate.
- **Don't edit `data/` by hand.** It belongs to GitHup and the workflow.

## Versioning and changelog

- Status uses [Date Versioning](https://datevers.ing) (since v26.10.23; Semantic Versioning
  before that): the version is the UTC date of the release as `YY.MM.DD` (e.g. `26.10.22`), and a
  second release on the same UTC day is `26.10.22-1`, then `-2` and so on. Use `date -u`, not
  local time. Never a future date, never a date before the latest release, and a released version
  is never reused.
- The version lives in `VERSION.md` (the bare version, no `v`). Set it on every release. The `v`
  only appears in git tags (`v26.10.22`) and changelog headings.
- Every release gets a `CHANGELOG.md` entry using `###` subsections in this order: Added,
  Changed, Fixed, Removed, Security, Deprecated. Never a bare bullet list under a version.
- `commit.sh` (bash) and `commit.bat` (Windows) read `VERSION.md`, refuse anything that isn't a
  valid Date Version (or is dated in the future, UTC), commit as `Release vX` and create the
  annotated `vX` tag. They don't push: push with `git push origin main vX`.

## Tests

```bash
./tests/run.sh
```

Plain bash, no dependencies. It checks that `VERSION.md` is a valid Date Version, a real calendar
date, and the same as the newest `## v...` heading in `CHANGELOG.md`. Run it before every release.
