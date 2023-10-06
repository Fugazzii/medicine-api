import { Module } from '@nestjs/common';
import { ClientFormController } from './client-form.controller';
import { ClientAuthController } from './client-auth.controller';
import { ClientDoctorController } from './client-doctor.controller';

@Module({
  imports: [],
  controllers: [ClientFormController, ClientAuthController, ClientDoctorController],
  providers: [],
})
export class ClientModule {}
