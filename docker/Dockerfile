FROM node:10.15.1

COPY server /app/
COPY build /app/build/

WORKDIR /app

EXPOSE 5000

ENTRYPOINT ["node","server.js"]
