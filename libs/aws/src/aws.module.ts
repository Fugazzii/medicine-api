import { Module } from "@nestjs/common";
import { SesService } from "./services/ses.service";
import { ConfigService } from "@nestjs/config";
import { KmsService } from "./services/kms.service";
import { KMS } from "@aws-sdk/client-kms";

@Module({
  providers: [SesService, KmsService, ConfigService, KMS],
  exports: [SesService, KmsService, KMS]
})
export class AwsModule {}
