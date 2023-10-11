import { Column, ManyToOne, Entity as Model, PrimaryGeneratedColumn } from "typeorm";
import { DoctorEntity } from "../entities";
import { SpecialtyTypeormModel } from "@app/specialty";
import { CityTypeormModel } from "@app/city-lib";

@Model("doctors")
export class DoctorTypeormModel implements DoctorEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ type: "varchar", length: 11 })
    public private_id: string;

    @Column({ type: "varchar" })
    public email: string;

    @Column({ type: "varchar" })
    public password: string;

    @Column({ type: "integer" })
    public age: number;

    @Column({ type: "boolean" })
    public gender: boolean;

    @Column({ type: "integer" })
    public experience_in_years:  number;

    @Column({ type: "integer" })
    public price_in_dollars: number;
    
    @Column({ type: "integer" })
    public rating: number;

    @ManyToOne(() => SpecialtyTypeormModel, (specialty: SpecialtyTypeormModel) => specialty.id)
    public specialty: number;

    @ManyToOne(() => CityTypeormModel, (city: CityTypeormModel) => city.id)
    public city: number;
}