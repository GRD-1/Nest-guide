<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

<p align="center">Nest.js training project</p>
<p align="center">
  <a href="https://nodejs.org/en/about" target="_blank"><img src="https://img.shields.io/badge/Node.js-v18.16.0-blue?logo=nodedotjs" alt="Node.js Version" /></a>
  <a href="https://www.typescriptlang.org/" target="_blank"><img src="https://img.shields.io/badge/TypeScript-v4.7.4-blue?logo=typescript" alt="TypeScript Version" /></a>
  <a href="https://nestjs.com/" target="_blank"><img src="https://img.shields.io/badge/Nest.js-v9.4.2-blue?logo=nestjs" alt="Nest.js Version" /></a>
  <a href="" target="_blank"><img src="https://img.shields.io/badge/covarage-5%25-%2300c642?style=flat" alt="Coverage" /></a>
  <a href="" rel="nofollow"><img src="https://img.shields.io/badge/istall_size-136%20KB-%23ebdb32?style=flat" alt="install size"></a>
</p>

## Contents
1. [Packages](#packages)
2. [Launch](#launch)
3. [Usage](#usage)
4. [Environment](#environment)
5. [Settings](#settings)
6. [API](#api)
7. [Documentation](#documentation)
8. [Tests](#tests)
9. [Database](#database)
10. [Logs](#logs)

## Packages

<ul>
  <li><a href="https://ubuntu.com/" target="_blank"><img src="https://img.shields.io/badge/Linux_Ubuntu-v22.04-blue?logo=ubuntu" alt="Linux Ubuntu Version" /></a></li>
  <li><a href="https://nodejs.org/en/about" target="_blank"><img src="https://img.shields.io/badge/Node.js-v18.16.0-blue?logo=nodedotjs" alt="Node.js Version" /></a></li>
  <li><a href="https://www.npmjs.com/" target="_blank"><img src="https://img.shields.io/badge/npm-v9.5.1-blue?logo=npm" alt="npm Version" /></a></li>
  <li><a href="https://www.typescriptlang.org/" target="_blank"><img src="https://img.shields.io/badge/TypeScript-v4.7.4-blue?logo=typescript" alt="TypeScript Version" /></a></li>
  <li><a href="https://nestjs.com/" target="_blank"><img src="https://img.shields.io/badge/Nest.js-v9.4.2-blue?logo=nestjs" alt="Nest.js Version" /></a></li>
  <li><a href="https://www.npmjs.com/package/mongoose" target="_blank"><img src="https://img.shields.io/badge/mongoose-v7.6.2-blue?logo=mongoose" alt="Mongoose Version" /></a></li>
  <li><a href="https://eslint.org/" target="_blank"><img src="https://img.shields.io/badge/eslint-v8.51.0-blue?logo=eslint" alt="Eslint Version" /></a></li>
  <li><a href="https://prettier.io/" target="_blank"><img src="https://img.shields.io/badge/prettier-v2.3.2-blue?logo=prettier" alt="Prettier Version" /></a></li>
  <li><a href="https://jestjs.io/" target="_blank"><img src="https://img.shields.io/badge/Jest-v29.0.5-blue?logo=jest" alt="Jest Version" /></a></li>
  <li><a href="https://www.npmjs.com/package/supertest" target="_blank"><img src="https://img.shields.io/badge/supertest-v6.1.3-blue" alt="Supertest Version" /></a></li>
</ul>

## Launch
The project is prepared to launch via the docker.
Firs of all, you need to install
<a href="https://www.docker.com/products/docker-desktop/" target="_blank">
<img src="https://img.shields.io/badge/docker-v24.0.2-blue?logo=docker" alt="Docker Version" />
</a>
Then run the corresponding command in the terminal.

* for development mode use:
``` bash
$ docker-compose --env-file env/.env.dev up
```
* for product mode use:
``` bash
$ docker-compose --env-file env/.env.prod up
```
* for test mode use:
``` bash
$ docker-compose --env-file env/.env.test up
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
