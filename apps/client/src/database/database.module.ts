/**
 * Nest imports
 */
import { DynamicModule, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

/**
 * Lib imports
 */
import { ClientTypeormModel } from "@app/client-lib/lib/models";
import { MailSenderSource } from "@app/common/lib/tokens";
import { MailSenderProvider } from "@app/common/lib/providers";
import { databaseConfig } from "./database.config";

@Module({})
export class DatabaseModule {
    public static forRoot(mailSenderSource: MailSenderSource): DynamicModule {
      const mailSenderProvider = MailSenderProvider.forRoot(mailSenderSource)        

      return {
        module: DatabaseModule,
        imports: [
          TypeOrmModule.forRoot({...databaseConfig, entities: [ClientTypeormModel]})
        ],
        providers: [mailSenderProvider],
        exports: [mailSenderProvider]
      };
    }
}