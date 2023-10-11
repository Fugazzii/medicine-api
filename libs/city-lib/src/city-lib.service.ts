import { Inject, Injectable } from '@nestjs/common';
import { CITY_REPOSITORY_TOKEN, CityRepositoryInterface } from './lib/repositories';
import { COUNTRY_REPOSITORY_TOKEN, CountryRepositoryInterface } from '@app/country-lib';

@Injectable()
export class CityLibService {
    public constructor(
        @Inject(CITY_REPOSITORY_TOKEN) private readonly cityRepository: CityRepositoryInterface,
        @Inject(COUNTRY_REPOSITORY_TOKEN) private readonly countryRepository: CountryRepositoryInterface
    ) {}

    public async getIdByName(cityName: string) {
        const { id } = await this.cityRepository.find(cityName);
        return id;
    }

    public async getCountryIdByCity(cityName: string) {
        const { country } = await this.cityRepository.find(cityName);
        return country;
    }

}