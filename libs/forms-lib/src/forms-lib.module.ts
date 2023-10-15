import { Module } from "@nestjs/common";
import { ClientFormService } from "./lib/services/";
import {
    FORM_REPOSITORY_TOKEN,
    FormTypeormRepository
} from "./lib/repositories";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FormTypeormModel } from "./lib/models";
import {
    SpecialtyModule,
    SpecialtyService,
    SpecialtyTypeormModel
} from "@app/specialty";

@Module({
    imports: [
        TypeOrmModule.forFeature([FormTypeormModel, SpecialtyTypeormModel]),
        SpecialtyModule,
    ],
    providers: [
        ClientFormService,
        { provide: FORM_REPOSITORY_TOKEN, useClass: FormTypeormRepository },
        SpecialtyService
    ],
    exports: [ClientFormService, FORM_REPOSITORY_TOKEN]
})
export class FormsLibModule {}
