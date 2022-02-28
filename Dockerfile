FROM node:16
WORKDIR /usr/src/house-renting-api
COPY package.json .
RUN npm set-script prepare "" && npm install --only=production
