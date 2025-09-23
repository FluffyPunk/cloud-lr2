FROM oven/bun:latest

COPY package.json ./
COPY bun.lock ./
COPY index.ts ./

RUN bun run index.ts