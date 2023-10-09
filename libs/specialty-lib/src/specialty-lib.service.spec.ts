import { Test, TestingModule } from '@nestjs/testing';
import { SpecialtyLibService } from './specialty-lib.service';

describe('SpecialtyLibService', () => {
  let service: SpecialtyLibService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpecialtyLibService],
    }).compile();

    service = module.get<SpecialtyLibService>(SpecialtyLibService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
