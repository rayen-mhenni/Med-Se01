FROM node:16.13-alpine

WORKDIR /usr/app/client/

COPY package*.json ./
EXPOSE 3000
RUN npm install -f
COPY src/ ./src
COPY public/ ./public
# RUN npm run build
CMD ["npm","run", "start"]