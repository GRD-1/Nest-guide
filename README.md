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

<div>
    <div>
      <style>
        .flex-container {
          display: flex;
          flex-wrap: wrap;
          height: 200px;
        }
        .flex-item {
          width: 30%;
          height: fit-content;
        }
      </style>
    </div>
    <div>
      <div class="flex-container">
          <div class="flex-item"><a href="https://ubuntu.com/" target="_blank"><img src="https://img.shields.io/badge/Linux_Ubuntu-v22.04-blue?style=for-the-badge&logo=ubuntu" alt="Linux Ubuntu Version" /></a></div>
          <div class="flex-item"><a href="https://www.typescriptlang.org/" target="_blank"><img src="https://img.shields.io/badge/TypeScript-v4.7.4-blue?style=for-the-badge&logo=typescript" alt="TypeScript Version" /></a></div>
          <div class="flex-item"><a href="https://eslint.org/" target="_blank"><img src="https://img.shields.io/badge/eslint-v8.51.0-blue?style=for-the-badge&logo=eslint" alt="Eslint Version" /></a></div>
          <div class="flex-item"><a href="https://www.docker.com/products/docker-desktop/" target="_blank"><img src="https://img.shields.io/badge/docker-v24.0.2-blue?style=for-the-badge&logo=docker" alt="Docker Version" /></a></div>
          <div class="flex-item"><a href="https://nestjs.com/" target="_blank"><img src="https://img.shields.io/badge/Nest.js-v9.4.2-blue?style=for-the-badge&logo=nestjs" alt="Nest.js Version" /></a></div>
          <div class="flex-item"><a href="https://jestjs.io/" target="_blank"><img src="https://img.shields.io/badge/Jest-v29.0.5-blue?style=for-the-badge&logo=jest" alt="Jest Version" /></a></div>
          <div class="flex-item"><a href="https://nodejs.org/en/about" target="_blank"><img src="https://img.shields.io/badge/Node.js-v18.16.0-blue?style=for-the-badge&logo=nodedotjs" alt="Node.js Version" /></a></div>
          <div class="flex-item"><a href="https://www.npmjs.com/package/mongoose" target="_blank"><img src="https://img.shields.io/badge/mongoose-v7.6.2-blue?style=for-the-badge&logo=mongoose" alt="Mongoose Version" /></a></div>
          <div class="flex-item"><a href="https://www.npmjs.com/package/supertest" target="_blank"><img src="https://img.shields.io/badge/supertest-v6.1.3-blue?style=for-the-badge" alt="Supertest Version" /></a></div>
          <div class="flex-item"><a href="https://www.npmjs.com/" target="_blank"><img src="https://img.shields.io/badge/npm-v9.5.1-blue?style=for-the-badge&logo=npm" alt="npm Version" /></a></div>
          <div class="flex-item"><a href="https://prettier.io/" target="_blank"><img src="https://img.shields.io/badge/prettier-v2.3.2-blue?style=for-the-badge&logo=prettier" alt="Prettier Version" /></a></div>
    </div>
    </div>
</div>

## Launch
The project is prepared to launch via the docker.You need to install
<a href="https://www.docker.com/products/docker-desktop/" target="_blank">Docker</a>
and then run the corresponding command in the terminal.

* for development mode use:
``` bash
$ docker stop $(docker ps -aq)
$ docker-compose --env-file env/.env.dev up -d
$ docker logs nest-guide-node-dev -f --tail 30
```
* for product mode use:
``` bash
$ docker stop $(docker ps -aq)
$ docker-compose --env-file env/.env.prod up -d
```
* for test mode use:
``` bash
$ docker stop $(docker ps -aq)
$ docker-compose --env-file env/.env.test up -d
```

## Usage

* After the service is launched it is available at http://localhost:3000/api/

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

* To perform the tests you need to be loaded in [Test mode](#Launch). It's important because the tests use a database (!)

```bash
# unit tests
$ docker exec nest-guide-node-test npm run test
```

```bash
# e2e tests
$ docker exec nest-guide-node-test npm run test:e2e
```

```bash
# test coverage
$ docker exec nest-guide-node-test npm run test:cov
```
