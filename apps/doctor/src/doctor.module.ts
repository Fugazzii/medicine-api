import { Module } from "@nestjs/common";
import { DoctorController } from "./doctor.controller";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "@app/database";
import { databaseConfig } from "./config";
import { DoctorLibModule } from "@app/doctor-lib";
import { CommonModule } from "@app/common";
import { DoctorTypeormModel } from "@app/doctor-lib/lib/models";
import { SpecialtyTypeormModel } from "@app/specialty";
import { CityTypeormModel } from "@app/city-lib";
import { CountryTypeormModel } from "@app/country-lib";

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
    CommonModule
  ],
  controllers: [DoctorController],
  providers: []
})
export class DoctorModule {}
