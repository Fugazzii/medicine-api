import { CityEntity } from "../entities";

export const CITY_REPOSITORY_TOKEN = Symbol("CITY_REPOSITORY_TOKEN");

export interface CityRepositoryInterface {
    find(cityName: string): Promise<CityEntity>;
    find(id: number): Promise<CityEntity>;
    find(arg: string | number): Promise<CityEntity>;
}
