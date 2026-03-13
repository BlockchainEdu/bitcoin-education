# Project Instructions

## Development Rules

- When the Next.js dev server is running, NEVER run `next build` simultaneously. Stop the dev server first, then build, then restart. The .next cache corruption causes white-page crashes.
- Always use `scripts/dev-safe.sh` to start the dev server. It auto-recovers from blank-page crashes.
- If the site goes white, run: `kill -9 $(lsof -ti:3000) && rm -rf .next && npm run dev`

## Writing Style

- Do NOT use AI-writing patterns: avoid em dashes, 'Key Takeaways' headers, and overly polished marketing language. Write in a natural, direct tone.

## UI Changes

- When making positional/layout changes (reordering sections, moving components), confirm the exact target location with the user BEFORE making the edit. Do not assume.

## Git

- Before committing, show the proposed commit message and wait for user approval. Do not auto-commit with a generated message.
