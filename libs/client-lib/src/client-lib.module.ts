/**
 * Nest imports
 */
import { Module } from '@nestjs/common';

/**
 * Local lib imports
 */
import { ClientTypeormRepository } from './lib/repositories';
import { ClientAuthService } from './lib/services';

/**
 * Exported lib imports
 */
import { RedisService } from '@app/redis';
import { AuthClientGuard } from './lib/guards/';
import { JwtService } from '@app/common';

@Module({
  imports: [],
  providers: [
    ClientTypeormRepository,
    ClientAuthService,
    JwtService,
    AuthClientGuard,
    RedisService
  ],
  exports: [
    ClientAuthService,
    AuthClientGuard
  ]
})
export class ClientLibModule {}
