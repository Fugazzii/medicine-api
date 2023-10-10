import { SpecialtyEntity } from "../entities";
import { Entity as Model, Column, PrimaryGeneratedColumn } from "typeorm";

@Model("specialties")
export class SpecialtyTypeormModel implements SpecialtyEntity {    
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ type: "varchar", length: 256 })
    public name: string;
}