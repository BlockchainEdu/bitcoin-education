FROM node:22-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package.json ./
COPY backend/package.json ./backend/
COPY frontend/package.json ./frontend/
RUN npm install --workspace=backend

FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY backend/package.json ./backend/
COPY backend/tsconfig.json ./backend/
COPY backend/src ./backend/src
RUN cd backend && npx tsc --declaration false --declarationMap false --sourceMap false || true

FROM base AS runner
ENV NODE_ENV=production
WORKDIR /app/backend
COPY --from=deps /app/node_modules /app/node_modules
COPY --from=build /app/backend/dist ./dist
COPY backend/package.json ./
COPY backend/drizzle ./drizzle
COPY backend/drizzle.config.ts ./

EXPOSE 3001
CMD ["node", "dist/index.js"]
