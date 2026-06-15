# Nexa Propiedades

Sitio web de Nexa Propiedades — vertical de búsqueda y asesoría inmobiliaria en Paraguay.

## Tech Stack

- **Framework:** Next.js (Pages Router)
- **Deployment:** Docker Swarm on VPS
- **Styling:** Tailwind CSS
- **Domain:** nexapropiedades.com (pending)

## Shared packages

This site consumes `@ai-whisperers/*` packages from GitHub Packages (npm.pkg.github.com).
The canonical source of those packages is **[`Ai-Whisperers/base`](https://github.com/Ai-Whisperers/base)**.

## Getting Started

```bash
npm install
cp .env.example .env.local  # fill in real values
npm run dev
```

## Deploy

```bash
docker build -t nexa-propiedades:prod .
docker service update --force --image nexa-propiedades:prod nexa-propiedades_web
```

## Related repos

- [`Ai-Whisperers/nexa-paraguay`](https://github.com/Ai-Whisperers/nexa-paraguay) — sibling Nexa site, uses App Router (we use Pages Router — see `docs/ARCHITECTURE_DECISION.md` if/when created).
- [`Ai-Whisperers/paragu-ai-platform`](https://github.com/Ai-Whisperers/paragu-ai-platform) — the shared monorepo.

## Locales

This site supports **3 locales**: `es`, `en`, `pt` (Portuguese, for Brazilian buyers).
