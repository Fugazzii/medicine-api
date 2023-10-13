import { Module } from '@nestjs/common';
import { SuggestionsVerticesService } from './suggestions-vertices.service';

@Module({
  providers: [SuggestionsVerticesService],
  exports: [SuggestionsVerticesService],
})
export class SuggestionsVerticesModule {}
