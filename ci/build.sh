#!/bin/sh

set -e -x

cd source-code
  npm install
  npm run build
  ls ./src/main/resources/static
  cp -a ./react-src/build ./src/main/resources/static
  ./mvnw clean package
cd ..

cp source-code/target/helloapi-0.0.1-SNAPSHOT.jar  build-output/.
