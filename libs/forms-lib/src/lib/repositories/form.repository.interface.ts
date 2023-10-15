import { FormEntity } from "../entities";

export const FORM_REPOSITORY_TOKEN = Symbol("FORM_REPOSITORY_TOKEN");

export interface FormRepositoryInterface {
    create(newForm: Omit<FormEntity, "id">): Promise<number>;
    findOne(id: number): Promise<FormEntity>;
    deleteOne(id: number): Promise<void>;
    findAll(id: number): Promise<Array<FormEntity>>;
}
