#!/bin/sh

set -e -x

cd source-code
  ./mvnw clean package
  cd react-src
  ./ npm install
  ./npm run build
  cp build ../src/main/resources/static
cd ..

cp source-code/target/helloapi-0.0.1-SNAPSHOT.jar  build-output/.
