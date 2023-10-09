import { SpecialtyEntity } from "../entities";

export interface SpecialtyRepositoryInterface {
    find(id: number): Promise<SpecialtyEntity>;
    find(name: string): Promise<SpecialtyEntity>;
    find(arg: number | string): Promise<SpecialtyEntity>;
}