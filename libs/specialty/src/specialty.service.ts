import { Inject, Injectable } from "@nestjs/common";
import { SPECIALTY_REPOSITORY_TOKEN, SpecialtyRepositoryInterface } from "./lib/repositories";

@Injectable()
export class SpecialtyService {
    public constructor(
        @Inject(SPECIALTY_REPOSITORY_TOKEN) private readonly repository: SpecialtyRepositoryInterface
    ) {}

    public async getIdByName(name: string) {
        const { id } = await this.repository.find(name);
        return id;
    }
}