# BEN - Blockchain Education Network

A full-stack platform for the Blockchain Education Network built as a pnpm monorepo.

## Tech Stack

- **Frontend**: Next.js 16, React 18, Tailwind CSS 2 (JIT), TypeScript
- **Backend**: Express, Drizzle ORM, PostgreSQL, TypeScript
- **Production**: Docker Compose, Nginx, Azure VM

## Project Structure

```
bitcoin-education/
├── frontend/          # Next.js app (port 3000)
├── backend/           # Express API (port 3001)
├── docker-compose.yml          # Local dev (PostgreSQL only)
├── docker-compose.prod.yml     # Production (all services)
└── Makefile                    # Deploy commands
```

## Local Development

### Prerequisites

- Node.js 22+
- pnpm (`npm install -g pnpm`)
- Docker (for PostgreSQL)

### Setup

1. Copy environment file and fill in your values:
```bash
cp .env.example .env
```

2. Install dependencies:
```bash
pnpm install
```

3. Start PostgreSQL:
```bash
docker compose up -d
```

4. Apply database schema:
```bash
pnpm db:push
```

5. Start dev servers (frontend + backend):
```bash
pnpm dev
```

The frontend runs on http://localhost:3000 and the backend on http://localhost:3001.

### Other Commands

```bash
pnpm build          # Build both frontend and backend
pnpm db:generate    # Generate Drizzle migrations
pnpm db:migrate     # Run Drizzle migrations
pnpm db:studio      # Open Drizzle Studio (visual DB browser)
pnpm typecheck      # Type-check both workspaces
pnpm lint           # Lint both workspaces
```

## Production Deployment

The site runs on an Azure VM with Docker Compose (PostgreSQL + backend + frontend behind Nginx).

### Deploy Steps

1. SSH into the production server
2. Navigate to the project directory
3. Pull latest code: `git pull`
4. Deploy: `make prd-deploy`

`make prd-deploy` builds Docker images, stops running containers, and starts fresh ones.

### Make Targets

```bash
make prd-build      # Build Docker images
make prd-stop       # Stop containers
make prd-start      # Start containers
make prd-deploy     # Build + stop + start (full deploy)
```

### Connect to Production Database

Tunnel via SSH, then use any PostgreSQL client on `localhost:5432`:
```bash
ssh -N -L 5432:127.0.0.1:5432 <user>@<server>
```

## Environment Variables

See `.env.example` for all required variables. Key groups:

- **Database**: `DATABASE_URL`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`
- **Auth**: `JWT_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
- **Stripe**: `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, webhook secrets
- **Frontend**: `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_SITE_URL`, analytics IDs
- **Backend**: `BACKEND_URL` (set to `http://backend:3001` in Docker, `http://localhost:3001` locally)
