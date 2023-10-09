import { Inject, Injectable } from '@nestjs/common';
import { FORM_REPOSITORY_TOKEN, FormRepositoryInterface } from './lib/repositories';
import { CreateFormDto } from './lib/dtos';

@Injectable()
export class ClientFormService {

    public constructor(
        @Inject(FORM_REPOSITORY_TOKEN) private readonly formRepository: FormRepositoryInterface
    ) {}

    public createForm(createFormDto: CreateFormDto) {
        return this.formRepository.create(createFormDto);
    }

    public deleteForm(id: number) {
        return this.formRepository.deleteOne(id);
    }

    public getFormById(id: number) {
        return this.formRepository.findOne(id); 
    }

    public getForms(id: number) {
        return this.formRepository.findAll(id);
    }

}
