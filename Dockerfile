FROM node:16.18.0-alpine3.15

WORKDIR /opt/car-api
RUN mkdir -p ./es
RUN mkdir -p ./src

COPY ./src ./src
COPY ./es ./es
COPY package.json .
COPY tsconfig.json .

RUN npm install
RUN npm run compile

EXPOSE 5000

ENTRYPOINT [ "npm", "start"]
