import { Module } from '@nestjs/common';
import { ClientFormService } from './client-form.service';
import { FORM_REPOSITORY_TOKEN, FormTypeormRepository } from './lib/repositories';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormTypeormModel } from './lib/models';

@Module({
  imports: [
    TypeOrmModule.forFeature([FormTypeormModel])
  ],
  providers: [
    ClientFormService,
    { provide: FORM_REPOSITORY_TOKEN, useClass: FormTypeormRepository }
  ],
  exports: [
    ClientFormService,
    { provide: FORM_REPOSITORY_TOKEN, useClass: FormTypeormRepository }
  ]
})
export class FormsLibModule {}
