FROM node:6.10.3-alpine

RUN apk add --no-cache \
      bash \
      ca-certificates

WORKDIR /app

COPY package.json /app/
COPY yarn.lock /app/

RUN yarn install --frozen-lockfile --production

COPY . /app/

CMD ["npm", "run", "start"]
