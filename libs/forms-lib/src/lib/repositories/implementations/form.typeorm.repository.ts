import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FormTypeormModel } from "../../models";
import { FormRepositoryInterface } from "../form.repository.interface";
import { FormEntity } from "../../entities";
import { Repository } from "typeorm";

@Injectable()
export class FormTypeormRepository implements FormRepositoryInterface {

    public constructor(
        @InjectRepository(FormTypeormModel) private readonly repository: Repository<FormTypeormModel>
    ) {}

    public async create(newForm: Omit<FormEntity, "id">): Promise<void> {
        this.repository.insert(newForm);
    }

    public async findOne(id: number): Promise<FormEntity> {
        return this.repository.findOne({ where: { id } });
    }

    public async deleteOne(id: number): Promise<void> {
        const target = await this.findOne(id);

        if(!target) return;

        this.repository.delete(target);
    }

    public async findAll(id: number): Promise<Array<FormEntity>> {
        return this.repository.find({
            where: { id }
        });
    }

}