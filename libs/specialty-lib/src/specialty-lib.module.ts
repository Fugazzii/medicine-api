import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpecialtyTypeormModel } from './lib/models';
import { SPECIALTY_REPOSITORY_TOKEN, SpecialtyTypeormRepository } from '.';
import { SpecialtyService } from './specialty-lib.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SpecialtyTypeormModel])
  ],
  providers: [
    { provide: SPECIALTY_REPOSITORY_TOKEN, useClass: SpecialtyTypeormRepository },
    SpecialtyService
  ],
  exports: [
    SpecialtyService,
    SPECIALTY_REPOSITORY_TOKEN
  ]
})
export class SpecialtyLibModule {}
