/**
 * Nest imports
 */
import { DynamicModule, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

/**
 * Lib imports
 */
import { MailSenderSource } from "@app/common/lib/tokens";
import { MailSenderProvider } from "@app/common/lib/providers";
import { databaseConfig } from "./database.config";
import { ClientTypeormModel } from "@app/client-lib/lib/models";
import { FormTypeormModel } from "@app/forms-lib";
import { SpecialtyTypeormModel } from "@app/specialty";
import { CityTypeormModel } from "@app/city-lib";
import { CountryTypeormModel } from "@app/country-lib";

@Module({})
export class DatabaseModule {
    public static forRoot(mailSenderSource: MailSenderSource): DynamicModule {
      const mailSenderProvider = MailSenderProvider.forRoot(mailSenderSource)        

      return {
        module: DatabaseModule,
        imports: [
          TypeOrmModule.forRoot({
            ...databaseConfig,
            entities: [
              ClientTypeormModel, 
              FormTypeormModel, 
              SpecialtyTypeormModel, 
              CityTypeormModel, 
              CountryTypeormModel
            ]
          })
        ],
        providers: [mailSenderProvider],
        exports: [mailSenderProvider]
      };
    }
}