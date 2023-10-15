import { Module } from "@nestjs/common";
import { ClientAuthFacade } from "./client-auth.facade";
import { JwtService } from "@app/common";
import { RedisService } from "@app/redis";
import { ClientLibModule } from "@app/client-lib";
import { ClientFormFacade } from "./client-form.facade";
import { ClientFormService, FormsLibModule } from "@app/forms-lib";
import { SpecialtyModule, SpecialtyService } from "@app/specialty";
import { AwsModule, DynamoDBService, KmsService } from "@app/aws";
import { NatsModule, NatsService } from "@app/nats";
import { CityLibModule, CityLibService } from "@app/city-lib";
import { CountryLibModule, CountryLibService } from "@app/country-lib";
import { ClientDoctorFacade } from "./client-doctor.facade";

@Module({
    imports: [
        ClientLibModule,
        FormsLibModule,
        SpecialtyModule,
        AwsModule,
        NatsModule,
        CityLibModule,
        CountryLibModule
    ],
    providers: [
        ClientAuthFacade,
        ClientDoctorFacade,
        ClientFormFacade,
        ClientFormService,
        JwtService,
        RedisService,
        SpecialtyService,
        KmsService,
        NatsService,
        CityLibService,
        CountryLibService
    ],
    exports: [ClientAuthFacade, ClientFormFacade, ClientDoctorFacade]
})
export class FacadeModule {}
