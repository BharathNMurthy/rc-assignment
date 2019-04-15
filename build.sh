#!/bin/sh
npm run install
npm run build-react
cp -r client/build/ docker/build/
cp -r server/ docker/server/
cd docker; docker build -t app . --no-cache
rm -r build/; rm -r server/