import { ClientEntity } from "../entities";

export interface ClientRepositoryInterface {
    save(newClient: ClientEntity): Promise<ClientEntity>;
    findOne(id: number): Promise<ClientEntity>;
    findOne(email: string): Promise<ClientEntity>;
    deleteOne(id: number): Promise<void>;
}