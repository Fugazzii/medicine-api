import { Injectable } from "@nestjs/common";
import { ClientRepositoryInterface } from "../client.repository.interface";
import { ClientEntity } from "../../entities";
import { InjectRepository } from "@nestjs/typeorm";
import { ClientModel } from "../../models";
import { Repository } from "typeorm";

@Injectable()
export class ClientRepository implements ClientRepositoryInterface {
    
    public constructor(
        @InjectRepository(ClientModel) private readonly repository: Repository<ClientModel>
    ) {}

    public async save(newClient: ClientEntity): Promise<ClientEntity> {
        return this.repository.create(newClient);
    }

    public async findOne(id: number): Promise<ClientEntity>;
    public async findOne(email: string): Promise<ClientEntity>;
    public async findOne(arg: number | string): Promise<ClientEntity> {
        
        const isEmail = typeof arg === "string";
        
        return isEmail 
            ? this.repository.findOneBy({ email: arg }) 
            : this.repository.findOne({ where: { id: arg } }) 
    }

    public async deleteOne(id: number): Promise<void> {
        const target = await this.findOne(id);

        if(!target) return;

        this.repository.delete(target);
    }
    
}