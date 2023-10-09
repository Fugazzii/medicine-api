import { Inject, Injectable } from "@nestjs/common";
import { SPECIALTY_REPOSITORY_TOKEN, SpecialtyRepositoryInterface } from "./lib/repositories";

@Injectable()
export class SpecialtyService {
    public constructor(
        @Inject(SPECIALTY_REPOSITORY_TOKEN) private readonly repository: SpecialtyRepositoryInterface
    ) {}
}