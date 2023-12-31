import {
    Column,
    JoinColumn,
    ManyToOne,
    Entity as Model,
    PrimaryGeneratedColumn
} from "typeorm";
import { FormEntity } from "../entities";
import { SpecialtyTypeormModel } from "@app/specialty";
import { ClientTypeormModel } from "@app/client-lib/lib/models";

@Model("forms")
export class FormTypeormModel implements FormEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(
        () => ClientTypeormModel,
        (client: ClientTypeormModel) => client.id
    )
    public client: number;

    @Column({ type: "varchar", length: 5096, nullable: false })
    public description: string;

    @ManyToOne(
        () => SpecialtyTypeormModel,
        (specialty: SpecialtyTypeormModel) => specialty.id
    )
    public relevant_specialist: number;

    @Column({ type: "integer", nullable: false })
    public price_from: number;

    @Column({ type: "integer", nullable: false })
    public price_to: number;

    @Column({ type: "integer", nullable: false })
    public city: number;
}
