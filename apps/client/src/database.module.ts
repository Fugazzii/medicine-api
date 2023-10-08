/**
 * Nest imports
 */
import { DynamicModule, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";

/**
 * Lib imports
 */
import { ClientLibModule } from "@app/client-lib";
import { AuthClientGuard } from "@app/client-lib/lib/guards";
import { ClientTypeormModel } from "@app/client-lib/lib/models";
import { ClientTypeormRepository } from "@app/client-lib/lib/repositories";
import { ClientAuthService } from "@app/client-lib/lib/services";
import { MailSenderSource, OrmSource } from "@app/client-lib/lib/tokens";
import { OrmProvider, MailSenderProvider } from "@app/common/lib/providers";
import { RedisModule, RedisService } from "@app/redis";

@Module({})
export class DatabaseModule {
    public static forRoot(mailSenderSource: MailSenderSource, ormSource: OrmSource): DynamicModule {
        const ormProvider = OrmProvider.forRoot(ormSource);
        const mailSenderProvider = MailSenderProvider.forRoot(mailSenderSource)
    
        return {
          module: ClientLibModule,
          imports: [
            TypeOrmModule.forRootAsync({
              imports: [ConfigModule],
              useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                username: configService.get<string>('POSTGRES_USERNAME'),
                password: configService.get<string>('POSTGRES_PASSWORD'),
                database: configService.get<string>('POSTGRES_DATABASE'),
                host: configService.get<string>('POSTGRES_HOST'),
                port: configService.get<number>('POSTGRES_PORT'),
                synchronize: true,
                entities: [ClientTypeormModel]
              }),
              inject: [ConfigService]
            }),
            TypeOrmModule.forFeature([ClientTypeormModel]),
          ],
          providers: [
            ormProvider,
            mailSenderProvider, 
          ],
          exports: [
            ormProvider,
            mailSenderProvider,
          ]
        };
    }
}