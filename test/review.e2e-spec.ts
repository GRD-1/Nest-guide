import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { disconnect, Types } from 'mongoose';
import supertest, { SuperTest } from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateReviewDto } from '../src/review/dto/create-review.dto';

const productId = new Types.ObjectId().toHexString();
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

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/review/create (POST)', async (): Promise<number> => {
    const result = await request(app.getHttpServer())
      .post('/review/create')
      .send(testCreateReviewDto)
      .expect(201);

    await expect(result.body).toBeDefined();
    createdId = result.body._id;
    return 100;
  });

  it('/review/:id (DELETE)', async (): Promise<number> => {
    await request(app.getHttpServer())
      .delete(`/review/${createdId}`)
      .expect(200);
    return 200;
  });

  afterAll(() => {
    disconnect();
    // await app.close();
  });
});
