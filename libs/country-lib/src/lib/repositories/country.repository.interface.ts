import { CountryEntity } from "../entities";

export const COUNTRY_REPOSITORY_TOKEN = Symbol("COUNTRY_REPOSITORY_TOKEN"); 

export interface CountryRepositoryInterface {
    find(id: number): Promise<CountryEntity>;
    find(name: string): Promise<CountryEntity>;
    find(arg: number | string): Promise<CountryEntity>;
}