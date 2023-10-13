import { Test, TestingModule } from '@nestjs/testing';
import { KnnController } from './knn.controller';
import { KnnService } from './knn.service';

describe('KnnController', () => {
  let knnController: KnnController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [KnnController],
      providers: [KnnService],
    }).compile();

    knnController = app.get<KnnController>(KnnController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(knnController.getHello()).toBe('Hello World!');
    });
  });
});
