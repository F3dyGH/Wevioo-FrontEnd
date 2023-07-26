FROM node:16.18.1-alpine as builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install -g @angular/cli
RUN npm install

COPY . .

RUN ng build --configuration=production

FROM nginx:latest

COPY --from=builder /app/dist/cantine-ng /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
