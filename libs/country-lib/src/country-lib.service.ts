import { Inject, Injectable } from "@nestjs/common";
import {
    COUNTRY_REPOSITORY_TOKEN,
    CountryRepositoryInterface
} from "./lib/repositories";

@Injectable()
export class CountryLibService {
    public constructor(
        @Inject(COUNTRY_REPOSITORY_TOKEN)
        private readonly countryRepository: CountryRepositoryInterface
    ) {}

    public async getNameById(countryName: string) {
        const { name } = await this.countryRepository.find(countryName);
        return name;
    }
}
