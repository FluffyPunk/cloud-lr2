FROM oven/bun:latest

COPY package.json ./
COPY bun.lock ./
COPY index.ts ./
COPY index.html ./

EXPOSE 3000/tcp

ENTRYPOINT [ "bun", "run", "index.ts" ]