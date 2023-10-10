import { Inject, Injectable } from '@nestjs/common';
import { FORM_REPOSITORY_TOKEN, FormRepositoryInterface } from './lib/repositories';
import { CreateFormDto } from './lib/dtos';
import { SpecialtyService } from '@app/specialty';

@Injectable()
export class ClientFormService {

    public constructor(
        @Inject(FORM_REPOSITORY_TOKEN) private readonly formRepository: FormRepositoryInterface,
        private readonly specialtyService: SpecialtyService
    ) {}

    public async createForm(createFormDto: CreateFormDto) {

        const specialist_id = await this.specialtyService.getIdByName(createFormDto.relevant_specialist_name);

        return this.formRepository.create({
            client_id: createFormDto.client_id,
            description: createFormDto.description,
            relevant_specialist_id: specialist_id
        });
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
