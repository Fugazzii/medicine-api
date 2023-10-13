import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CountryEntity } from "../../entities";
import { CountryRepositoryInterface } from "../country.repository.interface";
import { CountryTypeormModel } from "../../models";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CountryTypeormRepository implements CountryRepositoryInterface {
    public constructor(
        @InjectRepository(CountryTypeormModel)
        private readonly repository: Repository<CountryTypeormModel>
    ) {}

    public async find(id: number): Promise<CountryEntity>;
    public async find(name: string): Promise<CountryEntity>;
    public async find(arg: string | number): Promise<CountryEntity> {
        const isName = typeof arg === "string";

        return isName
            ? this.repository.findOne({ where: { name: arg } })
            : this.repository.findOne({ where: { id: arg } });
    }
}
