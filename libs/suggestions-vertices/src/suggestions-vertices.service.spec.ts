import { Test, TestingModule } from '@nestjs/testing';
import { SuggestionsVerticesService } from './suggestions-vertices.service';

describe('SuggestionsVerticesService', () => {
  let service: SuggestionsVerticesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuggestionsVerticesService],
    }).compile();

    service = module.get<SuggestionsVerticesService>(SuggestionsVerticesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
