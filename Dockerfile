FROM node:16.18.0-alpine3.15


WORKDIR /opt/car-api
RUN mkdir -p ./es

COPY ./es ./es
COPY package.json .

RUN npm install --production

EXPOSE 5000

ENTRYPOINT [ "npm", "start"]
