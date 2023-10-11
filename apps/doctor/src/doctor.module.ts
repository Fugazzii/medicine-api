import { Module } from "@nestjs/common";
import { DoctorController } from "./doctor.controller";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "@app/database";
import { databaseConfig } from "./config";
import { DoctorLibModule } from "@app/doctor-lib";
import { CommonModule, PasswordValidationPipe } from "@app/common";
import { DoctorTypeormModel } from "@app/doctor-lib/lib/models";
import { SPECIALTY_REPOSITORY_TOKEN, SpecialtyModule, SpecialtyService, SpecialtyTypeormModel } from "@app/specialty";
import { CityLibModule, CityLibService, CityTypeormModel } from "@app/city-lib";
import { CountryLibModule, CountryLibService, CountryTypeormModel } from "@app/country-lib";
import { DoctorAuthFacade } from "@app/facade/doctor-auth.facade";
import { FacadeModule } from "@app/facade";
import { RedisService } from "@app/redis";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule.forRoot(databaseConfig, [
      DoctorTypeormModel,
      SpecialtyTypeormModel,
      CityTypeormModel,
      CountryTypeormModel
    ]),
    DoctorLibModule,
    CommonModule,
    FacadeModule,
    SpecialtyModule,
    CityLibModule,
    CountryLibModule
  ],
  controllers: [DoctorController],
  providers: [
    DoctorAuthFacade,
    RedisService,
    CityLibService,
    SpecialtyService,
    CountryLibService
  ]
})
export class DoctorModule {}
