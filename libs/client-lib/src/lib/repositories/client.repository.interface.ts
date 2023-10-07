import { ClientEntity } from "../entities";

export interface ClientRepositoryInterface {
    save(newClient: Omit<ClientEntity, "id">): Promise<void>;
    findOne(id: number): Promise<ClientEntity>;
    findOne(email: string): Promise<ClientEntity>;
    deleteOne(id: number): Promise<void>;
}