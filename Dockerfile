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

# workerd (unlike Node's own fetch) verifies TLS against the OS trust store,
# which the slim base image doesn't include by default. Without it, outbound
# fetch() from inside the Worker fails with a generic internal error.
RUN apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates \
  && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 3020

WORKDIR /app/dist/server
CMD ["npx", "wrangler", "dev", "--port", "3020", "--ip", "0.0.0.0"]
