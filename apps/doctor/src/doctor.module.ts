import { Module } from "@nestjs/common";
import { DoctorController } from "./doctor.controller";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "@app/database";
import { databaseConfig } from "./config";
import { DoctorLibModule } from "@app/doctor-lib";
import { CommonModule } from "@app/common";
import { DoctorTypeormModel } from "@app/doctor-lib/lib/models";
import {
    SpecialtyModule,
    SpecialtyService,
    SpecialtyTypeormModel
} from "@app/specialty";
import { CityLibModule, CityLibService, CityTypeormModel } from "@app/city-lib";
import {
    CountryLibModule,
    CountryLibService,
    CountryTypeormModel
} from "@app/country-lib";
import { DoctorAuthFacade } from "@app/facade/doctor-auth.facade";
import { FacadeModule } from "@app/facade";
import { RedisService } from "@app/redis";
import { NatsModule } from "@app/nats";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        DatabaseModule.forRoot(databaseConfig, [
            DoctorTypeormModel,
            SpecialtyTypeormModel,
            CityTypeormModel,
            CountryTypeormModel,
        ]),
        DoctorLibModule,
        CommonModule,
        FacadeModule,
        SpecialtyModule,
        CityLibModule,
        CountryLibModule,
        NatsModule
    ],
    controllers: [DoctorController],
    providers: [
        DoctorAuthFacade,
        RedisService,
        CityLibService,
        SpecialtyService,
        CountryLibService,
    ]
})
export class DoctorModule {}
