import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { disconnect, Types } from 'mongoose';
import { AppModule } from '../src/app.module';
import { CreateReviewDto } from '../src/review/dto/create-review.dto';
import { REVIEW_NOT_FOUND } from '../src/review/review.constants';

const productId = '99999';
const testCreateReviewDto: Omit<CreateReviewDto, '_id'> = {
  name: 'test review name',
  title: 'test review title',
  description: 'test review description',
  rating: 5,
  productId
};

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let createdId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/review/create (POST) - success', () => {
    return request(app.getHttpServer())
      .post('/review/create')
      .send(testCreateReviewDto)
      .expect(201)
      .then(({ body }: request.Response):void => {
        createdId = body._id;
      });
  });

  it('/review/create (POST) - fail', () => {
    return request(app.getHttpServer())
      .post('/review/create')
      .send({ ...testCreateReviewDto, rating: 0 })
      .expect(400)
      .then(({ body }: request.Response):void => {
        console.log('\nbody: ', body);
      });
  });

  it('/review/byProductId/:productId (GET) - success', () => {
    return request(app.getHttpServer())
      .get(`/review/byProductId/${productId}`)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBe(1);
      });
  });

  it('/review/byProductId/:productId (GET) - fail', () => {
    const fakeProductId = '00000';
    return request(app.getHttpServer())
      .get(`/review/byProductId/${fakeProductId}`)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBe(0);
      });
  });

  it('/review/:id (DELETE) - success', () => {
    const result = request(app.getHttpServer())
      .delete(`/review/${createdId}`)
      .expect(200);
    return result;
  });

  it('/review/:id (DELETE) - fail', () => {
    const fakeProductId = new Types.ObjectId().toHexString();
    const result = request(app.getHttpServer())
      .delete(`/review/${fakeProductId}`)
      .expect(404, {
        statusCode: 404,
        message: REVIEW_NOT_FOUND
      });
    return result;
  });

  afterAll(() => {
    disconnect();
    app.close();
  });
});
