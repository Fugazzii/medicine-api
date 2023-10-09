import { Test, TestingModule } from '@nestjs/testing';
import { CountryLibService } from './country-lib.service';

describe('CountryLibService', () => {
  let service: CountryLibService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CountryLibService],
    }).compile();

    service = module.get<CountryLibService>(CountryLibService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
