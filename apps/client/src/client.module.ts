import { Module } from "@nestjs/common";
import { ClientFormController } from "./client-form.controller";
import { ClientAuthController } from "./client-auth.controller";
import { ClientDoctorController } from "./client-doctor.controller";
import { ConfigModule } from "@nestjs/config";
import { AwsModule } from "@app/aws";
import { SesService } from "@app/aws/services/ses.service";

@Module({
  imports: [
    ConfigModule.forRoot({ 
      envFilePath: "/home/ilia/Desktop/pending/medicine-api/.env"
    }),
    AwsModule
  ],
  controllers: [
    ClientFormController,
    ClientAuthController,
    ClientDoctorController
  ],
  providers: [
    SesService
  ]
})
export class ClientModule {}
