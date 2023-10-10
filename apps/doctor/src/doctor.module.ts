import { Module } from "@nestjs/common";
import { DoctorController } from "./doctor.controller";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "@app/database";
import { databaseConfig } from "./config";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule.forRoot(databaseConfig, [])
  ],
  controllers: [DoctorController],
  providers: []
})
export class DoctorModule {}
