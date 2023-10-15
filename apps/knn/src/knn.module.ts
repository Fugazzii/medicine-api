import { Module } from "@nestjs/common";
import { KnnController } from "./knn.controller";
import { AwsModule } from "@app/aws";
import { CommonModule } from "@app/common";
import { DoctorVerticesModule, DoctorVerticesService } from "@app/doctor-vertices";
import { CityLibModule, CityLibService, CityTypeormModel } from "@app/city-lib";
import { CountryLibModule, CountryTypeormModel } from "@app/country-lib";
import { DatabaseModule } from "@app/database";
import { databaseConfig } from "./config";
import { NatsModule, NatsService } from "@app/nats";
import { ClientTypeormModel } from "@app/client-lib";
import { SuggestionsVerticesModule, SuggestionsVerticesService } from "@app/suggestions-vertices";

@Module({
    imports: [
        AwsModule, 
        CommonModule,
        DoctorVerticesModule,
        CityLibModule,
        CountryLibModule,
        DatabaseModule.forRoot(
            databaseConfig,
            [CityTypeormModel,CountryTypeormModel, ClientTypeormModel]
        ),
        NatsModule,
        SuggestionsVerticesModule
    ],
    controllers: [
        KnnController
    ],
    providers: [
        DoctorVerticesService,
        CityLibService,
        NatsService,
        SuggestionsVerticesService
    ]
})
export class KnnModule {}
