import { Test, TestingModule } from '@nestjs/testing';
import { DoctorLibService } from './doctor-lib.service';

describe('DoctorLibService', () => {
  let service: DoctorLibService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DoctorLibService],
    }).compile();

    service = module.get<DoctorLibService>(DoctorLibService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
