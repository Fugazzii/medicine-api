import { Module } from "@nestjs/common";
import { SesService } from "./services/ses.service";
import { ConfigService } from "@nestjs/config";
import { KmsService } from "./services/kms.service";
import { KMS } from "@aws-sdk/client-kms";
import { SnsService } from "./services/sns.service";

@Module({
    providers: [SesService, KmsService, ConfigService, KMS, SnsService],
    exports: [SesService, KmsService, KMS, SnsService]
})
export class AwsModule {}
