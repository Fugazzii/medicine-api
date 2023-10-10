/**
 * Nest imports
 */
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";

/**
 * App imports
 */
import { ClientLibModule } from "@app/client-lib";
import { MailSenderSource } from "@app/common/lib/tokens";
import { AwsModule } from "@app/aws";
import { SesService } from "@app/aws/services/ses.service";
import { CommonModule } from "@app/common";

/**
 * Local imports
 */
import { ClientFormController, ClientAuthController, ClientDoctorController } from "./controllers";
import { DatabaseModule } from "./database/database.module";
import { RedisModule } from "@app/redis";
import { FacadeModule } from "@app/facade";
import { FormsLibModule } from "@app/forms-lib";
import { AuthClientGuard } from "@app/client-lib/lib/guards";
import { ClientAuthService } from "@app/client-lib/lib/services";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule.forRoot(MailSenderSource.AWS_SES),
    AwsModule,
    CommonModule,
    RedisModule,
    FacadeModule,
    ClientLibModule
  ],
  providers: [
    ConfigService,
    SesService,
    AuthClientGuard,
    ClientAuthService
  ],
  controllers: [
    ClientFormController,
    ClientAuthController,
    ClientDoctorController
  ]
})
export class ClientModule {}
