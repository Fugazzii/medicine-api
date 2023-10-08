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
import { DatabaseModule } from "./database.module";
import { RedisModule } from "@app/redis";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule.forRoot(MailSenderSource.AWS_SES, OrmSource.TYPEORM),
    AwsModule,
    CommonModule,
    RedisModule
  ],
  providers: [
    ConfigService,
    SesService,
    ClientAuthFacade,
    JwtService
  ],
  controllers: [
    ClientFormController,
    ClientAuthController,
    ClientDoctorController
  ]
})
export class ClientModule {}
