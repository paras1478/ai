FROM node:20-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN chmod -R 755 node_modules/.bin

COPY . .

RUN npx vite build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]