FROM node:boron
MAINTAINER Arnar Gauti Ingason

WORKDIR /app

ADD package.json /app

RUN npm install

ADD index.js /app
ADD util /app/util

EXPOSE 9123

ENTRYPOINT ["node", "index.js"]
