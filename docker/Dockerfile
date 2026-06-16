FROM node:24-alpine

RUN apk add --no-cache python3 make g++ \ && npm install -g bun@1.3.14

WORKDIR /app

COPY package.json bun.lock ./

RUN bun install

COPY . .

EXPOSE 3001

CMD ["bun", "run", "dev"]
