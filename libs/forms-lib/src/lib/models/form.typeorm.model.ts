import { Column, Entity as Model, PrimaryGeneratedColumn } from "typeorm";
import { FormEntity } from "../entities";

@Model("forms")
export class FormTypeormModel implements FormEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ type: "integer", nullable: false })
    public client_id: number;

    @Column({ type: "varchar", length: 5096, nullable: false })
    public description: string;

    @Column({ type: "integer", nullable: false })
    public relevant_specialist_id: number;
}