import { CityEntity } from "../entities";
import { Column, ManyToOne, Entity as Model, PrimaryGeneratedColumn } from "typeorm";
import { CountryEntity } from "@app/country-lib";

@Model("cities")
export class CityTypeormModel implements CityEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => CityTypeormModel, (country: CountryEntity) => country.id)
    public country: number;

    @Column({ type: "varchar", length: 256 })
    public name: string;
}