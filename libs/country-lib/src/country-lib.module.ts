import { Module } from '@nestjs/common';
import { CountryLibService } from './country-lib.service';

@Module({
  providers: [CountryLibService],
  exports: [CountryLibService],
})
export class CountryLibModule {}
