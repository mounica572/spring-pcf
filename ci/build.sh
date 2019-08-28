#!/bin/sh

set -e -x

cd ../
  ./mvnw clean package
cd ..
