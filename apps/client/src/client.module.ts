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
import { CommonModule, MailSenderProvider } from "@app/common";

/**
 * Local imports
 */
import { ClientFormController, ClientAuthController, ClientDoctorController } from "./controllers";
import { RedisModule } from "@app/redis";
import { FacadeModule } from "@app/facade";
import { AuthClientGuard } from "@app/client-lib/lib/guards";
import { ClientAuthService } from "@app/client-lib/lib/services";
import { DatabaseModule } from "@app/database";
import { ClientTypeormModel } from "@app/client-lib/lib/models";
import { FormTypeormModel } from "@app/forms-lib";
import { SpecialtyTypeormModel } from "@app/specialty";
import { CityTypeormModel } from "@app/city-lib";
import { CountryTypeormModel } from "@app/country-lib";
import { databaseConfig } from "./config";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule.forRoot(databaseConfig,
      [
        ClientTypeormModel, 
        FormTypeormModel, 
        SpecialtyTypeormModel, 
        CityTypeormModel, 
        CountryTypeormModel
      ]
    ),
    AwsModule,
    CommonModule,
    RedisModule,
    FacadeModule,
    ClientLibModule,
  ],
  providers: [
    MailSenderProvider.forRoot(MailSenderSource.AWS_SES),
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
