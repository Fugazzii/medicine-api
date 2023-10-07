import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientModel } from './lib/models';
import { ClientRepository } from './lib/repositories';

@Module({
  imports: [TypeOrmModule.forFeature([ClientModel])],
  providers: [ClientRepository],
  exports: [ClientRepository],
})
export class ClientLibModule {}
