FROM node:14.17-alpine as build

RUN apk add --virtual gyp curl bash python make g++ && rm -rf /var/cache/apk/*
RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin

WORKDIR /src

COPY . .

RUN npm install

RUN npm run nx -- build core --production --no-cache
RUN npm prune --production
RUN /usr/local/bin/node-prune

FROM node:14.17-alpine

WORKDIR /dist

COPY --from=build /src/dist/ ./dist
COPY --from=build /src/node_modules ./node_modules

ENV NODE_ENV production
CMD ["node", "dist/apps/core/main.js"]
