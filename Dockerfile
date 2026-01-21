FROM node:20-alpine AS base

# 1. Prune the workspace
FROM base AS prune
WORKDIR /app
RUN npm install turbo --global
COPY . .
RUN turbo prune api --docker

# 2. Install dependencies (including dev dependencies for build)
FROM base AS installer
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY --from=prune /app/out/json/ .
RUN npm install --include=dev

# 3. Build the app
FROM base AS builder
WORKDIR /app
RUN npm install turbo --global
COPY --from=installer /app/node_modules ./node_modules
COPY --from=prune /app/out/full/ .
# Generate Prisma Client explicitly to ensure it exists
RUN npx prisma generate --schema=packages/database/prisma/schema.prisma
RUN turbo build --filter=api

# 4. Run the app
FROM base AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs
USER nestjs

COPY --from=builder /app .

EXPOSE 3000
CMD ["node", "apps/api/dist/main.js"]
