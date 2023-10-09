import { CountryEntity } from "../entities";

export interface CountryRepositoryInterface {
    find(id: number): Promise<CountryEntity>;
    find(name: string): Promise<CountryEntity>;
    find(arg: number | string): Promise<CountryEntity>;
}