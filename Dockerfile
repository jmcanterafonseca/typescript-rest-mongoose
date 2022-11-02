FROM node:16.18.0-alpine3.15

WORKDIR /opt/car-api
RUN mkdir -p ./es
RUN mkdir -p ./src

COPY ./src ./src
COPY ./es ./es
COPY package.json .

RUN npm install --production
RUN npm run compile

EXPOSE 5000

ENTRYPOINT [ "npm", "start"]
