Spring Boot PCF Git Project
Readme

Spring Boot application deployed to Pivotal Cloud Foundry

## Overview

This document outlines information and steps to run, test and deploy this project

## Project Repo

[https://github.com/slalom/spring-boot-pcf.git](https://github.com/slalom/spring-boot-pcf.git)

## Environment/Stack

* IDE of choice
* Maven
* Spring Tool Suite 4 
* Pivotal Cloud Foundry
* Mongodb (pivotal service)

* TBD - Concourse
* TBD - Spinnaker

### In order to set up on a new account in PCF and a new database, follow the instructions below.
#### Sign up for pivotal cloud web services

1.	https://account.run.pivotal.io/z/uaa/sign-up
2.	create account
3.	verify email
4.	Click on Pivotal Web Services
5.	Claim your Trial, and verify via sms
6.	Create your org name
7.	Install ths cf cli 
	1.	brew install cloudfoundry/tap/cf-cli
8.	Try the following command to test that the cf CLI works:
	1.	cf help
9.	Login to cf 
	1.	cf login -a https://api.run.pivotal.io
	
	
#### Running the Application

1.	Cd into the application directory 
2.	Mvn package 
3.	‘mvn spring-boot:run 
	1.	Or if you have spring boot dashboard installed, use the ui 	
	1.	https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-spring-boot-dashboard 

#### Deploying the application

1.	Mvn package 
2.	*cf push app-name -p target/app-name.jar 

#### Add Mongo Database

##### In pivotal PCF add mongodb service

1.	Login to https://console.run.pivotal.io/ 
2.	Click on your app name 
3.	In the left tab click on marketplace and search for mongodb 
4.	Select mlab mongo-db-as-a-service 
5.	Select free plan 
6.	In the next form, choose and instance name, add to space and bind to app 
7.	Go back home and you should see services(1) in the left hand nav 
8.	Click on services and click on the name of the mongodb service 
9.	In the top right click “manage” 
10.	Click on the db  
11.	This will be your bd uri for application.properties 
12.	Select Users from the tab section below 
13.	Add a user with username and password 
14.	add credentials to application.properties file: spring.data.mongodb.uri=mongodb://<dbusername>:<dbpassword>@<dburi> 
15.	Check your db in the command line thus: mongo ds157857.mlab.com:57857/dbname -u username -p password 
16.	Change your mongo service name in manifest.yaml to your db name 
	1.	   MONGO_SERVICE_NAME: "mymongodb" 

*OR via the cf cli

1.	TBD


#### Front End

*	Front end is TBD, probably will be react 

### Resource Links

* PCF app manifests: https://docs.cloudfoundry.org/devguide/deploy-apps/manifest-attributes.html
* Concourse: https://www.youtube.com/watch?v=1RRZHPlTkXs&feature=youtu.be&t=3586
* Spinnaker: https://www.slideshare.net/Pivotal/making-microservices-smarter-with-istio-envoy-and-pivotal-service-mesh?next_slideshow=1
* [Official Apache Maven documentation](https://maven.apache.org/guides/index.html)
* [Spring Boot DevTools](https://docs.spring.io/spring-boot/docs/{bootVersion}/reference/htmlsingle/#using-boot-devtools)
* [Spring Data Reactive MongoDB](https://docs.spring.io/spring-boot/docs/{bootVersion}/reference/htmlsingle/#boot-features-mongodb)
*[Spring Boot Guide](https://spring.io/guides/gs/spring-boot/)








