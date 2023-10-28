<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

<p align="center">Nest.js training project</p>
<p align="center">
  <a href="" target="_blank"><img src="https://img.shields.io/badge/npm-v9.5.1-blue?style=flat&logo=nodedotjs" alt="NPM Version" /></a>
  <a href="" target="_blank"><img src="https://img.shields.io/badge/covarage-5%25-%2300c642?style=flat" alt="Coverage" /></a>
  <a href="" rel="nofollow"><img src="https://img.shields.io/badge/istall_size-136%20KB-%23ebdb32?style=flat" alt="install size"></a>
</p>

## Contents
1. [Packages](#packages)
2. [Deploy](#deploy)
3. [Launch](#launch)
4. [Usage](#usage)
5. [Environment](#environment)
6. [Settings](#settings)
7. [API](#api)
8. [Documentation](#documentation)
9. [Tests](#tests)
10. [Database](#database)
11. [Logs](#logs)

## Packages

- OS Ubuntu-22.04
- Node.js 18.16.0
- npm 9.5.1
- ...

## Deploy

The project is prepared to launch via the docker. All it's components are described in the docker files
include the databases and are installed automatically. 
To deploy the application just run the corresponding command in the terminal.

* for development mode use:
``` bash
$ docker-compose -f docker-dev.yml build --no-cache -d --env-file env/.env.dev 
```
* for product mode use:
``` bash
$ docker-compose -f docker-prod.yml build --no-cache
```
* for test mode use:
``` bash
$ docker-compose -f docker-test.yml build --no-cache
```

## Launch

* for development mode use:
``` bash
$ docker-compose -f docker-dev.yml up -d --env-file env/.env.dev
```
* for product mode use:
``` bash
$ docker-compose -f docker-prod.yml up
```
* for test mode use:
``` bash
$ docker-compose -f docker-test.yml up
```

## Usage

* After the service is launched it is available at http://localhost:3000

## Environment

Environment variables are here: ./env
They connected to the project in the docker-compose files at the [env_file] section.

## Settings

* the settings are here: ./src/config/config.ts

## API

* swagger (add to api)

## Documentation

* compodoc (add to api)

## Tests

* All tests are here: _src/test
* html coverage report will be here: _src/test/coverage

* to run tests in local mode:
    * To run unit tests use the command: [ npm run test:unit ]
    * To run integration tests use the command: [ npm run test:int ]
    * To run a specific test use the command: [ jest <pathToSpecificTest> ]
    * To run all tests and get the coverage map use the command: [ npm run test:cov ]

* to run tests in docker mode:
    * Build the project in development mode using the command [ docker-compose -f docker-dev.yml up --build ]
    * To run unit tests use the command: [ docker exec -it taskqueues-node-1 npm run test:unit ]
    * To run integration tests use the command: [ docker exec -it taskqueues-node-1 npm run test:int ]
    * To run a specific test use the command: [ docker exec -it taskqueues-node-1 jest <pathToSpecificTest> ]
    * To run all tests and get the coverage map use the command: [ docker exec -it taskqueues-node-1 npm run test:cov ]

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
