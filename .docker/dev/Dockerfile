FROM node:20-slim AS install

# You may need to copy more files than just package.json in your code
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

WORKDIR /app
RUN npm install
COPY . /app
ENV NODE_ENV=development