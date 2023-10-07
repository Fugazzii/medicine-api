import { Module } from "@nestjs/common";
import { ClientFormController } from "./client-form.controller";
import { ClientAuthController } from "./client-auth.controller";
import { ClientDoctorController } from "./client-doctor.controller";
import { AwsModule } from "@app/aws";
import { SesService } from "@app/aws/services/ses.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientLibModule } from "@app/client-lib";

@Module({
  imports: [
    AwsModule,
    ConfigModule.forRoot({ 
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        username: configService.get<string>("POSTGRES_USERNAME"),
        password: configService.get<string>("POSTGRES_PASSWORD"),
        database: configService.get<string>("POSTGRES_DATABASE"),
        host: configService.get<string>("POSTGRES_HOST"),
        port: configService.get<number>("POSTGRES_PORT"),
        synchronize: true,
        entities: []
      }),
      inject: [ConfigService]
    }),
    ClientLibModule
  ],
  controllers: [
    ClientFormController,
    ClientAuthController,
    ClientDoctorController
  ],
  providers: [
    SesService,
    ConfigService
  ]
})
export class ClientModule {}
