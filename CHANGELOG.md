# Changelog

All notable changes to Stux.Group's status page (status.stux.group) are documented here. It
follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## v1.0.0

### Added

- status.stux.group, a GitHup status page for Stux.Group's websites and services: Stux.Group, Stux.Group Services, the Stux.Group media CDN, Stux.Dev, Stuxedo, Stux.Music, Ream.st, Multi.st Twitch, Multi.st YouTube and GitHup, checked every 5 minutes
- `.github/workflows/status.yml`: a GitHup `check` every 5 minutes with incident Issues, then a build into `_site` with GitHup's `site-dir` input, deployed with `actions/deploy-pages` when a status changes, hourly and on pushes
- The **Boring Legal Stuff** hub at `/legal/` with Privacy Policy, Terms and Ethics, Cookies Policy, Imprint, Disclaimer and Opt-Out Preferences, and a `404.html`, styled to match the status page in light and dark themes
- A live status badge in the README, read from `data/summary.json`
- `dev-server.sh`/`dev-server.bat` that build the page from generated example data into `.dev/public` and serve it locally with `DEV_MODE` on by default (`--no-dev-mode` to opt out)
- `commit.sh`/`commit.bat` release scripts that read `VERSION.md` and tag `vX.Y.Z`
