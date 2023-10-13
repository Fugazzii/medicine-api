import { Controller, Get } from '@nestjs/common';
import { KnnService } from './knn.service';

@Controller()
export class KnnController {
  constructor(private readonly knnService: KnnService) {}

  @Get()
  getHello(): string {
    return this.knnService.getHello();
  }
}
