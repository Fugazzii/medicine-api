import { Inject, Injectable } from "@nestjs/common";
import {
    FORM_REPOSITORY_TOKEN,
    FormRepositoryInterface
} from "../repositories";
import { FormEntity } from "../entities";

@Injectable()
export class ClientFormService {
    public constructor(
        @Inject(FORM_REPOSITORY_TOKEN)
        private readonly formRepository: FormRepositoryInterface
    ) {}

    public async createForm(createFormEntity: Omit<FormEntity, "id">) {
        return this.formRepository.create(createFormEntity);
    }

    public deleteForm(id: number) {
        return this.formRepository.deleteOne(id);
    }

    public getFormById(id: number) {
        return this.formRepository.findOne(id);
    }

    public getForms(client_id: number) {
        return this.formRepository.findAll(client_id);
    }
}
