import { Column, JoinColumn, ManyToOne, Entity as Model, PrimaryGeneratedColumn } from "typeorm";
import { FormEntity } from "../entities";
import { SpecialtyTypeormModel } from "@app/specialty-lib/lib/models";
import { ClientTypeormModel } from "@app/client-lib/lib/models";

@Model("forms")
export class FormTypeormModel implements FormEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => ClientTypeormModel, (client: ClientTypeormModel) => client.id)
    public client_id: number;

    @Column({ type: "varchar", length: 5096, nullable: false })
    public description: string;

    @ManyToOne(() => SpecialtyTypeormModel, (specialty: SpecialtyTypeormModel) => specialty.id)
    public relevant_specialist_id: number;
}