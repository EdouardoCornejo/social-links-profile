# Social Links Profile

A single-screen profile card that shows an avatar, a short bio, and a list of social links. Built as a [Frontend Mentor](https://www.frontendmentor.io) challenge solution, it doubles as a reference setup for a small React + TypeScript + Vite app with strict linting, formatting, pre-commit hooks, and CI.

Audience: developers who want to read or extend the code.

## Demo

Live: **https://social-links-profile-jet-nine.vercel.app/**

<!-- Add screenshots at ./docs/desktop.png and ./docs/mobile.png, then uncomment: -->
<!-- ![Desktop](./docs/desktop.png) -->
<!-- ![Mobile](./docs/mobile.png) -->

## Stack

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-9-4B32C3?logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-3-F7B93E?logo=prettier&logoColor=black)

## Features

- Profile card composed from small presentational components: [`Card`](src/components/Card/index.tsx), [`Avatar`](src/components/Avatar/index.tsx), [`Info`](src/components/Info/index.tsx), [`ButtonList`](src/components/ButtonList/index.tsx).
- Social links come from a single static array in [src/components/data/index.ts](src/components/data/index.ts).
- No state library and no runtime data fetching — every component takes plain props.
- External links open in a new tab with `rel="noopener noreferrer"` ([src/components/ButtonList/index.tsx](src/components/ButtonList/index.tsx)).
- Self-hosted Inter font files under [src/assets/fonts/](src/assets/fonts/); typography scale via `text-preset-*` classes in [src/index.css](src/index.css).
- Type-checked ESLint flat config with `typescript-eslint` `recommendedTypeChecked` ([eslint.config.js](eslint.config.js)).
- Pre-commit hook runs `lint-staged` + a full build ([.husky/pre-commit](.husky/pre-commit)); GitHub Actions runs format check, lint, and build ([.github/workflows/ci.yml](.github/workflows/ci.yml)).

## Prerequisites

| Tool    | Version                | Source                                                                                       |
| ------- | ---------------------- | -------------------------------------------------------------------------------------------- |
| Node.js | `>=22` (CI runs on 24) | [package.json](package.json) `engines`, [.github/workflows/ci.yml](.github/workflows/ci.yml) |
| Yarn    | 1.x (Classic)          | [yarn.lock](yarn.lock)                                                                       |

## Quick start

```bash
git clone git@github.com:EdouardoCornejo/social-links-profile.git
cd social-links-profile
yarn install
yarn dev
```

Vite prints a local URL (default `http://localhost:5173`). The `prepare` script installs the Husky git hooks during `yarn install`.

## Scripts

All scripts are defined in [package.json](package.json).

| Script              | Command                                                        | What it does                                                     |
| ------------------- | -------------------------------------------------------------- | ---------------------------------------------------------------- |
| `yarn dev`          | `vite`                                                         | Starts the Vite dev server with HMR.                             |
| `yarn build`        | `tsc -b && vite build`                                         | Type-checks the project references, then bundles to `dist/`.     |
| `yarn preview`      | `vite preview`                                                 | Serves the built `dist/` locally to verify the production build. |
| `yarn lint`         | `eslint . --report-unused-disable-directives --max-warnings 0` | Lints the repo; any warning fails the run.                       |
| `yarn lint:fix`     | `eslint . … --fix`                                             | Same as `lint`, applying autofixes.                              |
| `yarn format:fix`   | `prettier --write .`                                           | Formats every supported file in place.                           |
| `yarn format:check` | `prettier --check .`                                           | Fails if any file is not Prettier-formatted (used in CI).        |
| `yarn prepare`      | `husky`                                                        | Installs git hooks; runs automatically after `yarn install`.     |

`lint-staged` (configured in [package.json](package.json)) runs `eslint --fix` + `prettier` on staged `*.{ts,tsx}` and `prettier` on staged `*.{js,cjs,mjs,json,css,md}`.

## Architecture

The app is a static component tree with no shared state. [src/main.tsx](src/main.tsx) mounts `<App />` in `<StrictMode>`; [src/App.tsx](src/App.tsx) hard-codes the profile content (name, location, bio, avatar) and composes the components. Each component under [src/components/](src/components/) is a typed function component (`FC`) that only renders its props — one folder per component with an `index.tsx`, re-exported through the [src/components/index.ts](src/components/index.ts) barrel. Styling is global CSS: [src/index.css](src/index.css) holds the `text-preset-*` type scale, [src/App.css](src/App.css) the layout classes.

```
src/
├── main.tsx           # Entry point
├── App.tsx            # Composes the card; owns the profile content
├── index.css / App.css
├── assets/            # Self-hosted Inter fonts + avatar image
└── components/
    ├── index.ts       # Barrel export
    ├── data/index.ts  # `links` array — the social links
    └── <Component>/index.tsx   # Avatar, Card, Info, ButtonList
```

## How to extend

**Add or change a social link** — edit the `links` array in [src/components/data/index.ts](src/components/data/index.ts):

```ts
export const links = [
  { name: 'GitHub', url: 'https://github.com/your-handle' },
  { name: 'Mastodon', url: 'https://mastodon.social/@you' }, // new entry
  // …
];
```

That is the only place to touch. [`ButtonList`](src/components/ButtonList/index.tsx) renders every entry and keys each item by `link.name`, so keep names unique.

**Change the profile identity** — edit the props passed to `<Info />` and `<Avatar />` in [src/App.tsx](src/App.tsx), and replace `src/assets/images/avatar-jessica.jpeg` (update the import name to match).

**Add a new component** — create `src/components/<Name>/index.tsx` exporting a typed `FC`, add `export * from './<Name>';` to [src/components/index.ts](src/components/index.ts), then use it in [src/App.tsx](src/App.tsx).

## Quality

- **Lint** — `yarn lint`. Flat ESLint config ([eslint.config.js](eslint.config.js)) with `@eslint/js` recommended, `typescript-eslint` `recommendedTypeChecked`, `react-hooks`, and `react-refresh`. Zero warnings allowed. `enum` and `namespace` are banned via `no-restricted-syntax` to keep syntax erasable.
- **Format** — `yarn format:check` / `yarn format:fix`. Prettier settings in [.prettierrc.json](.prettierrc.json): semicolons, single quotes, trailing commas everywhere, 100-char width. `eslint-config-prettier` disables conflicting lint rules.
- **Pre-commit** — [.husky/pre-commit](.husky/pre-commit) runs `yarn lint-staged` then `yarn build`, so a commit fails on a lint error or a type/build error.
- **CI** — [.github/workflows/ci.yml](.github/workflows/ci.yml) runs on push and PR to `main`: `yarn install --frozen-lockfile`, then `format:check`, `lint`, and `build` on Node 24.
- **TypeScript** — `strict`, `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`, `erasableSyntaxOnly` ([tsconfig.app.json](tsconfig.app.json)).

## Roadmap

- Replace the placeholder social URLs in [src/components/data/index.ts](src/components/data/index.ts) with real profiles.
- Move the hard-coded profile content out of [src/App.tsx](src/App.tsx) into a data module (mirroring `links`).
- Fix the page `<title>` and favicon reference in [index.html](index.html) (still "Vite + React + TS", favicon typed as SVG but points to a PNG).
- Add component tests (e.g. Vitest + Testing Library) and wire them into CI.
- Accessibility pass: descriptive `alt` text for the avatar, focus-visible styles for the links.

## License

No license. This is a private personal challenge project; all rights reserved.
