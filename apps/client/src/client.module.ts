import { Module } from "@nestjs/common";
import { ClientFormController } from "./client-form.controller";
import { ClientAuthController } from "./client-auth.controller";
import { ClientDoctorController } from "./client-doctor.controller";
import { AwsModule } from "@app/aws";
import { SesService } from "@app/aws/services/ses.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientLibModule } from "@app/client-lib";
import { OrmSource } from "@app/client-lib/lib/tokens";
import { ClientAuthService } from "@app/client-lib/lib/services";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AwsModule,
    ClientLibModule.forRoot(OrmSource.TYPEORM)
  ],
  controllers: [
    ClientFormController,
    ClientAuthController,
    ClientDoctorController
  ],
  providers: [
    SesService,
    ConfigService,
    ClientAuthService
  ]
})
export class ClientModule {}
