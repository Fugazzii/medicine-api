import { Test, TestingModule } from '@nestjs/testing';
import { CityLibService } from './city-lib.service';

describe('CityLibService', () => {
  let service: CityLibService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CityLibService],
    }).compile();

    service = module.get<CityLibService>(CityLibService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
