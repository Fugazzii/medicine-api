import { InjectRepository } from "@nestjs/typeorm";
import { SpecialtyTypeormModel } from "../../models";
import { Repository } from "typeorm";
import { SpecialtyRepositoryInterface } from "../specialty.repository.interface";
import { SpecialtyEntity } from "../../entities";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SpecialtyTypeormRepository
    implements SpecialtyRepositoryInterface
{
    public constructor(
        @InjectRepository(SpecialtyTypeormModel)
        private readonly repository: Repository<SpecialtyTypeormModel>
    ) {}

    public find(id: number): Promise<SpecialtyEntity>;
    public find(name: string): Promise<SpecialtyEntity>;
    public find(arg: string | number): Promise<SpecialtyEntity> {
        const isName = typeof arg === "string";

        return isName
            ? this.repository.findOneBy({ name: arg })
            : this.repository.findOne({ where: { id: arg } });
    }
}
