import { Module } from '@nestjs/common';
import { KnnController } from './knn.controller';
import { KnnService } from './knn.service';

@Module({
  imports: [],
  controllers: [KnnController],
  providers: [KnnService],
})
export class KnnModule {}
