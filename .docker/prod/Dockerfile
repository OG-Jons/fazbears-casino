FROM node:20-slim AS install

# corepack is an experimental feature in Node.js v20 which allows
# installing and managing versions of pnpm, npm, yarn
RUN corepack enable

VOLUME [ "/pnpm-store", "/app/node_modules" ]
RUN pnpm config --global set store-dir /pnpm-store

# You may need to copy more files than just package.json in your code
COPY package.json pnpm-lock.yaml /app/

WORKDIR /app
RUN pnpm install --frozen-lockfile

FROM install AS build
COPY . /app
ENV NODE_ENV=production
ENTRYPOINT ["pnpm", "start"]