import { ClientEntity } from "../entities";

export interface ClientRepositoryInterface {
    save(newClient: Omit<ClientEntity, "id">): Promise<void>;
    findOne(arg: string | number): Promise<ClientEntity>;
    deleteOne(id: number): Promise<void>;
}