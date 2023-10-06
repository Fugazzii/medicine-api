import { Module } from '@nestjs/common';
import { ClientFormController } from './client-form.controller';
import { ClientAuthController } from './client-auth.controller';
import { ClientController } from './client.controller';

@Module({
  imports: [],
  controllers: [ClientFormController, ClientAuthController, ClientController],
  providers: [],
})
export class ClientModule {}
