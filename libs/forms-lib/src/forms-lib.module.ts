import { Module } from '@nestjs/common';
import { FormsLibService } from './forms-lib.service';
import { FORM_REPOSITORY_TOKEN, FormTypeormRepository } from './lib/repositories';

@Module({
  providers: [
    FormsLibService,
    { provide: FORM_REPOSITORY_TOKEN, useClass: FormTypeormRepository }
  ],
  exports: [
    FormsLibService
  ]
})
export class FormsLibModule {}
