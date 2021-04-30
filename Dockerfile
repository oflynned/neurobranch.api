FROM node:14.15-alpine

RUN apk add --virtual gyp curl bash python make g++ && rm -rf /var/cache/apk/*

WORKDIR /app

COPY . .

RUN npm install
