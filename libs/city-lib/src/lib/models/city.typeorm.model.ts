import { CityEntity } from "../entities";
import { Column, JoinColumn, ManyToOne, Entity as Model, PrimaryGeneratedColumn } from "typeorm";
import { CountryEntity } from "@app/country-lib";

@Model("cities")
export class CityTypeormModel implements CityEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => CityTypeormModel, (country: CountryEntity) => country.id)
    @JoinColumn({ name: "country_id" })
    public country_id: number;

    @Column({ type: "varchar", length: 256 })
    public name: string;
}