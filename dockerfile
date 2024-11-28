FROM node:20.11.1-slim

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
       wget gnupg \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000 9300
