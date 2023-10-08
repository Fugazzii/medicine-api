import { ClientEntity } from "../entities";

export const CLIENT_REPOSITORY_TOKEN = Symbol("CLIENT_REPOSITORY_TOKEN");

export interface ClientRepositoryInterface {
    save(newClient: Omit<ClientEntity, "id">): Promise<void>;
    findOne(arg: string | number): Promise<ClientEntity>;
    deleteOne(id: number): Promise<void>;
}