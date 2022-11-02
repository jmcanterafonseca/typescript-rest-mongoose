FROM gcr.io/google-appengine/nodejs

WORKDIR /opt/car-appengine

COPY ./es .
COPY package.json .

RUN npm install --production

EXPOSE 5000

ENTRYPOINT [ "npm", "start"]
