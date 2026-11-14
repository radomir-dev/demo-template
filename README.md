# demo-template

Scaffold for a project demo page published at `https://radomir.dev/<repo>/` on GitHub Pages.

## Start a new demo

1. `gh repo create radomir-dev/<name> --template radomir-dev/demo-template --public --clone`
2. `npm install`
3. Set `name` in `package.json` to the repo name, and the `<title>`/description in `index.html`.
4. Replace `src/App.tsx` with the project's own demo.
5. In the repo settings, set Pages to deploy from the `gh-pages` branch.

The base path, canonical URL, repository link and version are derived at build time — from
`GITHUB_REPOSITORY` in Actions, otherwise from the `origin` git remote — so nothing else needs
editing. `package.json` `version` drives the version badge.

## What is already wired

1. `src/site/ProjectChrome.tsx` — Octocat link to the repo in the app bar, author footer, version badge in the bottom-left corner linking to the matching release.
2. `public/favicon.svg` — the radomir.dev mark.
3. `.github/workflows/deploy.yml` — builds and force-pushes `dist` to `gh-pages` on every push to `main`.
4. `.github/workflows/ci.yml` — type-check and build on pull requests.

## If the demo ships alongside a published package

The deploy workflow builds the commit that triggered it, which is one commit behind
`semantic-release`'s version bump. Add this trigger to `deploy.yml` so the version badge never lags
a release:

```yaml
on:
  workflow_run:
    workflows: ["Publish to npm"]
    types: [completed]
```

and guard the job with
`if: github.event_name != 'workflow_run' || github.event.workflow_run.conclusion == 'success'`.
