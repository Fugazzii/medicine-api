/**
 * Nest imports
 */
import { Module } from '@nestjs/common';

/**
 * Local lib imports
 */
import { CLIENT_REPOSITORY_TOKEN, ClientTypeormRepository } from './lib/repositories';
import { ClientAuthService } from './lib/services';

/**
 * Exported lib imports
 */
import { RedisService } from '@app/redis';
import { AuthClientGuard } from './lib/guards/';
import { JwtService, MailSenderProvider, MailSenderSource } from '@app/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientTypeormModel } from './lib/models';
import { SpecialtyLibModule } from '@app/specialty-lib';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClientTypeormModel])
  ],
  providers: [
    JwtService,
    AuthClientGuard,
    RedisService,
    ClientAuthService,
    MailSenderProvider.forRoot(MailSenderSource.AWS_SES),
    { provide: CLIENT_REPOSITORY_TOKEN, useClass: ClientTypeormRepository},
  ],
  exports: [
    { provide: CLIENT_REPOSITORY_TOKEN, useClass: ClientTypeormRepository},
    ClientAuthService,
    AuthClientGuard
  ]
})
export class ClientLibModule {}
