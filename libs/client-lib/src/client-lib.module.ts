import { Module, DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OrmSource } from './lib/tokens';
import { OrmProvider } from './lib/providers/orm.provider';
import { ClientTypeormRepository } from './lib/repositories';
import { ClientTypeormModel } from './lib/models';

@Module({})
export class ClientLibModule {
  static forRoot(ormSource: OrmSource): DynamicModule {
    const ormProvider = OrmProvider.forRoot(ormSource);
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
        TypeOrmModule.forFeature([ClientTypeormModel])
      ],
      providers: [ormProvider, ClientTypeormRepository],
      exports: [ormProvider, ClientTypeormRepository],
    };
  }
}
