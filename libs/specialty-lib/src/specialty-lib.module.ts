import { Module } from '@nestjs/common';
import { SpecialtyLibService } from './specialty-lib.service';

@Module({
  providers: [SpecialtyLibService],
  exports: [SpecialtyLibService],
})
export class SpecialtyLibModule {}
