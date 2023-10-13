import { Module } from "@nestjs/common";
import { CountryLibService } from "./country-lib.service";
import {
    COUNTRY_REPOSITORY_TOKEN,
    CountryTypeormRepository
} from "./lib/repositories";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CountryTypeormModel } from "./lib/models";

@Module({
    imports: [TypeOrmModule.forFeature([CountryTypeormModel])],
    providers: [
        CountryLibService,
        {
            provide: COUNTRY_REPOSITORY_TOKEN,
            useClass: CountryTypeormRepository
        }
    ],
    exports: [CountryLibService, COUNTRY_REPOSITORY_TOKEN]
})
export class CountryLibModule {}
