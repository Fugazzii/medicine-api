import { Module } from "@nestjs/common";
import { SesService } from "./services/ses.service";
import { ConfigService } from "@nestjs/config";

@Module({
  providers: [SesService, ConfigService],
  exports: [SesService]
})
export class AwsModule {}
