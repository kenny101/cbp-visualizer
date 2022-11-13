FROM node:12.18.0

WORKDIR /server
COPY package.json .
RUN npm install
COPY . .
CMD npm start