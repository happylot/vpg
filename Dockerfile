# syntax=docker/dockerfile:1

# This project builds to a Cloudflare Worker (see dist/server/wrangler.json,
# D1 binding, `cloudflare:*` imports), so it must run on Cloudflare's
# `workerd` runtime via `wrangler dev` rather than a plain Node server.
# `workerd`'s prebuilt binary needs glibc, so a Debian-based image is used
# instead of Alpine (musl).

FROM node:22-slim AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:22-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV CI=true
ENV WRANGLER_SEND_METRICS=false

COPY package.json package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 3020

WORKDIR /app/dist/server
CMD ["npx", "wrangler", "dev", "--port", "3020", "--ip", "0.0.0.0"]
