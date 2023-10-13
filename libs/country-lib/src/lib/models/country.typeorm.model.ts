import { Column, Entity as Model, PrimaryGeneratedColumn } from "typeorm";
import { CountryEntity } from "../entities";

@Model("countries")
export class CountryTypeormModel implements CountryEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ type: "varchar", length: 256 })
    public name: string;
}
