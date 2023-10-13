import { Module } from "@nestjs/common";
import { ClientAuthFacade } from "./client-auth.facade";
import { JwtService } from "@app/common";
import { RedisService } from "@app/redis";
import { ClientLibModule } from "@app/client-lib";
import { ClientFormFacade } from "./client-form.facade";
import { ClientFormService, FormsLibModule } from "@app/forms-lib";
import { SpecialtyModule, SpecialtyService } from "@app/specialty";
import { AwsModule, KmsService } from "@app/aws";

@Module({
    imports: [ClientLibModule, FormsLibModule, SpecialtyModule, AwsModule],
    providers: [
        ClientAuthFacade,
        ClientFormFacade,
        ClientFormService,
        JwtService,
        RedisService,
        SpecialtyService,
        KmsService
    ],
    exports: [ClientAuthFacade, ClientFormFacade]
})
export class FacadeModule {}
