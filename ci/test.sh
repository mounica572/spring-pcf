#!/bin/sh

set -e -x

cd source-code
  ./mvnw test
cd ..
