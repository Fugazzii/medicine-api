import { Module } from '@nestjs/common';
import { DoctorVerticesService } from './doctor-vertices.service';

@Module({
  providers: [DoctorVerticesService],
  exports: [DoctorVerticesService],
})
export class DoctorVerticesModule {}
