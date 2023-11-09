import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { disconnect } from 'mongoose';
import { AppModule } from '../src/app.module';
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from '../src/auth/auth.constants';

describe('e2e tests: auth module', () => {
  let app: INestApplication;
  let accessToken: string;
  let loginDto = {
    login: 'user_1@mail.ru',
    password: 'pass_1'
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    await request(app.getHttpServer())
      .post('/auth/register')
      .send(loginDto);

    const { body } = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto);
    accessToken = body.access_token;
  });

  it('/auth/login (POST) - success', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto)
      .expect(200, {
        access_token: accessToken
      });
  });

  it('/auth/login (POST) - invalid login', () => {
    loginDto = {
      login: 'fakeLogin',
      password: 'pass_1'
    };
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto)
      .expect(401, {
        statusCode: 401,
        message: USER_NOT_FOUND_ERROR
      });
  });

  it('/auth/login (POST) - invalid password', () => {
    loginDto = {
      login: 'user_1@mail.ru',
      password: 'fakePassword'
    };
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto)
      .expect(401, {
        statusCode: 401,
        message: WRONG_PASSWORD_ERROR
      });
  });

  afterAll(() => {
    disconnect();
    app.close();
  });
});
