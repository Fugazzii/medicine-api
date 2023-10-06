import { Module } from '@nestjs/common';
import { DoctorLibService } from './doctor-lib.service';

@Module({
  providers: [DoctorLibService],
  exports: [DoctorLibService],
})
export class DoctorLibModule {}
