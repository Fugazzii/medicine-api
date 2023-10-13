import { InjectRepository } from "@nestjs/typeorm";
import { CityRepositoryInterface } from "../city.repository.interface";
import { CityTypeormModel } from "../../models";
import { Repository } from "typeorm";
import { CityEntity } from "../../entities";

export class CityTypeormRepository implements CityRepositoryInterface {
    public constructor(
        @InjectRepository(CityTypeormModel)
        private readonly repository: Repository<CityTypeormModel>
    ) {}

    public find(id: number): Promise<CityEntity>;
    public find(name: string): Promise<CityEntity>;
    public find(arg: string | number): Promise<CityEntity> {
        const isName = typeof arg === "string";

        return isName
            ? this.repository.findOneBy({ name: arg })
            : this.repository.findOne({ where: { id: arg } });
    }
}
