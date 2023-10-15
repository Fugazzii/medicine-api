import { Module } from "@nestjs/common";
import { ClientAuthFacade } from "./client-auth.facade";
import { JwtService } from "@app/common";
import { RedisService } from "@app/redis";
import { ClientLibModule } from "@app/client-lib";
import { ClientFormFacade } from "./client-form.facade";
import { ClientFormService, FormsLibModule } from "@app/forms-lib";
import { SpecialtyModule, SpecialtyService } from "@app/specialty";
import { AwsModule, KmsService } from "@app/aws";
import { NatsModule, NatsService } from "@app/nats";
import { ClientsModule } from "@nestjs/microservices";

@Module({
    imports: [
        ClientLibModule,
        FormsLibModule,
        SpecialtyModule,
        AwsModule,
        NatsModule
    ],
    providers: [
        ClientAuthFacade,
        ClientFormFacade,
        ClientFormService,
        JwtService,
        RedisService,
        SpecialtyService,
        KmsService,
        NatsService
    ],
    exports: [ClientAuthFacade, ClientFormFacade]
})
export class FacadeModule {}
