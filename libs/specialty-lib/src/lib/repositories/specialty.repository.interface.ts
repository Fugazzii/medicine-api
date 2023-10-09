import { SpecialtyEntity } from "../entities";

export const SPECIALTY_REPOSITORY_TOKEN = Symbol("SPECIALTY_REPOSITORY_TOKEN");

export interface SpecialtyRepositoryInterface {
    find(id: number): Promise<SpecialtyEntity>;
    find(name: string): Promise<SpecialtyEntity>;
    find(arg: number | string): Promise<SpecialtyEntity>;
}