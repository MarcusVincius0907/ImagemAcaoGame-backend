FROM node:16-alpine AS builder

WORKDIR /app

COPY . .

RUN npm install
RUN npm run tsc

EXPOSE 3004

CMD ["npm", "start"]
