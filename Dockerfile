FROM node:22-alpine
WORKDIR /app
COPY server.mjs ./
COPY lib ./lib
USER 65534:65534
CMD ["node", "server.mjs"]
