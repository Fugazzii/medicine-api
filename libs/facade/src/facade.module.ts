import { Module } from '@nestjs/common';
import { ClientAuthFacade } from './client-auth.facade';
import { JwtService } from '@app/common';
import { RedisService } from '@app/redis';
import { ClientLibModule } from '@app/client-lib';
import { ClientFormFacade } from './client-form.facade';
import { ClientFormService, FormsLibModule } from '@app/forms-lib';
import { SpecialtyModule } from '@app/specialty';

@Module({
  imports: [
    ClientLibModule,
    FormsLibModule,
    SpecialtyModule
  ],
  providers: [
    ClientAuthFacade,
    ClientFormFacade,
    ClientFormService,
    JwtService,
    RedisService
  ],
  exports: [ClientAuthFacade, ClientFormFacade]
})
export class FacadeModule {}
