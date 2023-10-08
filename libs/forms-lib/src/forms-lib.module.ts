import { Module } from '@nestjs/common';
import { FormsLibService } from './lib/services/forms-lib.service';

@Module({
  providers: [FormsLibService],
  exports: [FormsLibService],
})
export class FormsLibModule {}
