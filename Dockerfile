FROM oven/bun:latest

COPY * ./

EXPOSE 3000/tcp

ENTRYPOINT [ "bun", "start"]