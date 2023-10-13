import { CityEntity } from "../entities";
import {
    Column,
    ManyToOne,
    Entity as Model,
    PrimaryGeneratedColumn
} from "typeorm";
import { CountryEntity, CountryTypeormModel } from "@app/country-lib";

@Model("cities")
export class CityTypeormModel implements CityEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(
        () => CountryTypeormModel,
        (country: CountryEntity) => country.id
    )
    public country: number;

    @Column({ type: "varchar", length: 256 })
    public name: string;

    @Column({ type: "float" })
    public longtitude: number;

    @Column({ type: "float" })
    public latitude: number;
}
