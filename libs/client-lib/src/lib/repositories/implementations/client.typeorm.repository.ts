/**
 * Nest imports
 */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

/**
 * Local imports
 */
import { ClientEntity } from "../../entities";
import { ClientTypeormModel } from "../../models";
import { ClientRepositoryInterface } from "../client.repository.interface";

@Injectable()
export class ClientTypeormRepository implements ClientRepositoryInterface {
    public constructor(
        @InjectRepository(ClientTypeormModel)
        private readonly repository: Repository<ClientTypeormModel>
    ) {}

    public async save(newClient: Omit<ClientEntity, "id">): Promise<void> {
        this.repository.insert(newClient);
    }

    public async findOne(id: number): Promise<ClientEntity>;
    public async findOne(email: string): Promise<ClientEntity>;
    public async findOne(arg: number | string): Promise<ClientEntity> {
        const isEmail = typeof arg === "string";

        return isEmail
            ? this.repository.findOneBy({ email: arg })
            : this.repository.findOne({ where: { id: arg } });
    }

    public async deleteOne(id: number): Promise<void> {
        const target = await this.findOne(id);

        if (!target) return;

        this.repository.delete(target);
    }
}
