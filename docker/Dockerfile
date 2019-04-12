FROM node:10.15.1

COPY server /app/
COPY build /app/build/

WORKDIR /app

EXPOSE 8080
EXPOSE 3000
EXPOSE 27017

ENTRYPOINT ["node","server.js"]
