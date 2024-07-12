FROM node:16.1-alpine3.13 AS base
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install

FROM node:16.1-alpine3.13 AS dist
WORKDIR /app
COPY --from=base /app .
COPY . .

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV
ARG PORT=3000
ENV PORT $PORT

EXPOSE $PORT 9229 9230
CMD ["node", "./server.js"]
