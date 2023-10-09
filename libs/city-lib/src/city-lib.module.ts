import { Module } from '@nestjs/common';
import { CityLibService } from './city-lib.service';

@Module({
  providers: [CityLibService],
  exports: [CityLibService],
})
export class CityLibModule {}
