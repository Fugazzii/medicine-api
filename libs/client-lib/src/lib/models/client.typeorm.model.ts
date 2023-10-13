/**
 * Concrete model for typeorm
 */

import { Entity as Model, PrimaryGeneratedColumn, Column } from "typeorm";
import { ClientEntity } from "../entities/client.entity";

@Model("clients")
export class ClientTypeormModel implements ClientEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ type: "varchar", length: 5096, unique: true, nullable: false })
    public private_id: string;

    @Column({ type: "varchar", length: 5096, unique: true, nullable: false })
    public email: string;

    @Column({ type: "integer", nullable: false })
    public age: number;

    @Column({ type: "varchar", length: 5096, nullable: false })
    public password: string;
}
