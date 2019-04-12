FROM node:10.15.1


COPY ./process.config.js /app/
COPY ./server /app/
COPY ./client/build/ /app/client/build/

WORKDIR /app

RUN npm install


EXPOSE 8080

ENTRYPOINT ["./node_modules/.bin/nodemon","start"]
