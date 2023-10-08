import { Module } from "@nestjs/common";
import { AwsModule } from "@app/aws";
import { SesService } from "@app/aws/services/ses.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientLibModule } from "@app/client-lib";
import { MailSenderSource, OrmSource } from "@app/client-lib/lib/tokens";
import { ClientAuthFacade } from "./facade";
import { ClientFormController, ClientAuthController, ClientDoctorController } from "./controllers";

@Module({
  imports: [
    AwsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ClientLibModule.forRoot(MailSenderSource.AWS_SES, OrmSource.TYPEORM)
  ],
  providers: [
    SesService,
    ClientAuthFacade,
    ConfigService
  ],
  controllers: [
    ClientFormController,
    ClientAuthController,
    ClientDoctorController
  ]
})
export class ClientModule {}
