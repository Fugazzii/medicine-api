import { Module } from '@nestjs/common';
import { ClientAuthFacade } from './client-auth.facade';
import { JwtService } from '@app/common';
import { RedisService } from '@app/redis';
import { ClientLibModule } from '@app/client-lib';

@Module({
  imports: [
    ClientLibModule
  ],
  providers: [
    ClientAuthFacade,
    JwtService,
    RedisService
  ],
  exports: [ClientAuthFacade],
})
export class FacadeModule {}
