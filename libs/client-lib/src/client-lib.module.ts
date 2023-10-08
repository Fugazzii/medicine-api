/**
 * Nest imports
 */
import { Module, DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

/**
 * Local lib imports
 */
import { MailSenderSource, OrmSource } from './lib/tokens';
import { MailSenderProvider, OrmProvider } from './lib/providers';
import { ClientTypeormRepository } from './lib/repositories';
import { ClientTypeormModel } from './lib/models';
import { ClientAuthService } from './lib/services';

/**
 * Exported lib imports
 */
import { RedisModule, RedisService } from '@app/redis';
import { AuthClientGuard } from './lib/guards/';
import { JwtService } from '@app/common/lib/services';

@Module({})
export class ClientLibModule {
  static forRoot(mailSenderSource: MailSenderSource, ormSource: OrmSource): DynamicModule {
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
        RedisModule
      ],
      providers: [
        ormProvider,
        mailSenderProvider, 
        ClientTypeormRepository, 
        ClientAuthService, 
        RedisService,
        AuthClientGuard,
        JwtService
      ],
      exports: [
        ormProvider,
        mailSenderProvider,
        ClientTypeormRepository,
        ClientAuthService,
        RedisService,
        AuthClientGuard
      ]
    };
  }
}
