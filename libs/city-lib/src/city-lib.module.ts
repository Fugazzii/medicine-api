import { Module } from "@nestjs/common";
import { CityLibService } from "./city-lib.service";
import {
    CITY_REPOSITORY_TOKEN,
    CityTypeormRepository
} from "./lib/repositories";
import {
    COUNTRY_REPOSITORY_TOKEN,
    CountryLibModule,
    CountryLibService,
    CountryTypeormModel
} from "@app/country-lib";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CityTypeormModel } from "./lib/models";

@Module({
    imports: [
        TypeOrmModule.forFeature([CountryTypeormModel, CityTypeormModel]),
        CountryLibModule
    ],
    providers: [
        CityLibService,
        CountryLibService,
        { provide: CITY_REPOSITORY_TOKEN, useClass: CityTypeormRepository }
    ],
    exports: [CityLibService, CITY_REPOSITORY_TOKEN, CountryLibService]
})
export class CityLibModule {}
