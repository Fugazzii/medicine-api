/**
 * Nest imports
 */
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";

/**
 * App imports
 */
import { ClientLibModule } from "@app/client-lib";
import { MailSenderSource, OrmSource } from "@app/client-lib/lib/tokens";
import { AwsModule } from "@app/aws";
import { SesService } from "@app/aws/services/ses.service";
import { CommonModule } from "@app/common";
import { JwtService } from "@app/common/lib/services";

/**
 * Local imports
 */
import { ClientFormController, ClientAuthController, ClientDoctorController } from "./controllers";
import { ClientAuthFacade } from "./facade";

@Module({
  imports: [
    AwsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ClientLibModule.forRoot(MailSenderSource.AWS_SES, OrmSource.TYPEORM),
    CommonModule
  ],
  providers: [
    SesService,
    ClientAuthFacade,
    ConfigService,
    JwtService
  ],
  controllers: [
    ClientFormController,
    ClientAuthController,
    ClientDoctorController
  ]
})
export class ClientModule {}
