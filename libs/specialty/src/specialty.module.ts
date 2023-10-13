import { Module } from "@nestjs/common";
import { SpecialtyService } from "./specialty.service";
import {
    SPECIALTY_REPOSITORY_TOKEN,
    SpecialtyTypeormRepository
} from "./lib/repositories";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SpecialtyTypeormModel } from "./lib/models";

@Module({
    imports: [TypeOrmModule.forFeature([SpecialtyTypeormModel])],
    providers: [
        SpecialtyService,
        {
            provide: SPECIALTY_REPOSITORY_TOKEN,
            useClass: SpecialtyTypeormRepository
        }
    ],
    exports: [SpecialtyService, SPECIALTY_REPOSITORY_TOKEN]
})
export class SpecialtyModule {}
