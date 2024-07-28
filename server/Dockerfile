FROM node:latest

WORKDIR /SkinScore

COPY package.json .

RUN npm install

COPY . .

COPY ../config /SkinScore/config

CMD ["npm", "start"]

EXPOSE 3001
