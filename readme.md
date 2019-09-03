Spring Boot PCF Git Project
Readme

Spring Boot application deployed to Pivotal Cloud Foundry

![alt text](https://github.com/slalom/spring-boot-pcf/blob/master/springbootpcfdiagram.jpg?raw=true "diagram")

## Overview

This document outlines information and steps to run, test and deploy this project

## Project Repo

[https://github.com/slalom/spring-boot-pcf.git](https://github.com/slalom/spring-boot-pcf.git)

## Environment/Stack

- IDE of choice
- Maven
- Spring Tool Suite 4
- Pivotal Cloud Foundry
- Mongodb (pivotal service)

- TBD - Concourse
- TBD - Spinnaker

### In order to set up on a new account in PCF and a new database, follow the instructions below.

#### Sign up for pivotal cloud web services

1. https://account.run.pivotal.io/z/uaa/sign-up
2. create account
3. verify email
4. Click on Pivotal Web Services
5. Claim your Trial, and verify via sms
6. Create your org name
7. Install ths cf cli
   1. brew install cloudfoundry/tap/cf-cli
8. Try the following command to test that the cf CLI works:
   1. cf help
9. Login to cf

   1. cf login -a https://api.run.pivotal.io

#### Running the Application

1. Cd into the application directory
2. Mvn package
3. ‘mvn spring-boot:run
   1. Or if you have spring boot dashboard installed, use the ui
   1. https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-spring-boot-dashboard

#### Deploying the application

1. Mvn package
2. \*cf push app-name -p target/app-name.jar

#### Add Mongo Database

##### In pivotal PCF add mongodb service

1. Login to https://console.run.pivotal.io/
2. Click on your app name
3. In the left tab click on marketplace and search for mongodb
4. Select mlab mongo-db-as-a-service
5. Select free plan
6. In the next form, choose and instance name, add to space and bind to app
7. Go back home and you should see services(1) in the left hand nav
8. Click on services and click on the name of the mongodb service
9. In the top right click “manage”
10. Click on the db
11. This will be your bd uri for application.properties
12. Select Users from the tab section below
13. Add a user with username and password
14. add credentials to application.properties file: spring.data.mongodb.uri=mongodb://<dbusername>:<dbpassword>@<dburi>
15. Check your db in the command line thus: mongo ds157857.mlab.com:57857/dbname -u username -p password

16. Change your mongo service name in manifest.yaml (manifest.yaml needs to be created at the root level) to your db name  1.    ---
    applications:

- name: yourappname
  env:
  MONGO_SERVICE_NAME: "yourdbinstancename" (find in PCF web services)

\*OR via the cf cli

1. https://docs.run.pivotal.io/devguide/services/managing-services.html

#### Front End

- Front end is TBD, probably will be react

### Resource Links

- PCF app manifests: https://docs.cloudfoundry.org/devguide/deploy-apps/manifest-attributes.html
- Concourse: https://www.youtube.com/watch?v=1RRZHPlTkXs&feature=youtu.be&t=3586
- Spinnaker: https://www.slideshare.net/Pivotal/making-microservices-smarter-with-istio-envoy-and-pivotal-service-mesh?next_slideshow=1
- [Official Apache Maven documentation](https://maven.apache.org/guides/index.html)
- [Spring Boot DevTools](https://docs.spring.io/spring-boot/docs/{bootVersion}/reference/htmlsingle/#using-boot-devtools)
- [Spring Data Reactive MongoDB](https://docs.spring.io/spring-boot/docs/{bootVersion}/reference/htmlsingle/#boot-features-mongodb) \*[Spring Boot Guide](https://spring.io/guides/gs/spring-boot/)

### Setting up Concourse CI

1. Install concourse - \$ wget https://concourse-ci.org/docker-compose.yml
2. \$ docker-compose up -d (Make sure you don’t have a port conflict.
   Concourse runs on 8080 by default.)
3. Download fly cli tools (https://medium.com/concourse-ci/getting-started-with-concourse-ci-on-macos-fb3a49a8e6b4)
4. brew cask install fly
5. Set up pipeline (see resource below, or view pipeline in sourcecode)
6. fly -t example set-pipeline --pipeline my-pipeline --config pipeline.yml
7. Make sure your creds aren't in the pipeline.yml
8. fly -t hello set-pipeline --pipeline my-pipeline --config pipeline.yml -l pipeline-secrets.yml

### resource links

- https://medium.com/concourse-ci/getting-started-with-concourse-ci-on-macos-fb3a49a8e6b4
- https://github.com/eddytnk/deploy-springboot-app-using-concourse-ci/blob/master/mvnw
- https://github.com/eddytnk/deploy-springboot-app-using-concourse-ci/blob/master/ci/pipeline.yml
- https://github.com/patrickcrocker/concourse-maven-cf-simple
