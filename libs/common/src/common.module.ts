import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { JwtService } from "./lib/services";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    JwtModule.register({
      global: true
    }),
    ConfigModule.forRoot({ envFilePath: "/var/usr/app/.env" })
  ],
  providers: [JwtService],
  exports: [JwtService]
})
export class CommonModule {}
