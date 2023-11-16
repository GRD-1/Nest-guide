import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { ReviewService } from './review.service';

describe('ReviewService', () => {
  let service: ReviewService;
  const exec = { exec: jest.fn() };
  const MockedReviewModel = (): any => ({ find: () => exec });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewService,
        { useFactory: MockedReviewModel, provide: getModelToken('ReviewModel') }
      ]
    }).compile();

    service = module.get<ReviewService>(ReviewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findByProductId - success', async () => {
    const id = new Types.ObjectId().toHexString();
    MockedReviewModel().find().exec.mockReturnValue([{ productId: id }]);
    const res = await service.findByProductId(id);
    // expect(res[0].productId).toBe(id);
    expect(res[0].productId).toBe(12345);
  });
});
