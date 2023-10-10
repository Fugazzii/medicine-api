import { JwtService } from "@app/common";
import { ClientFormService, CreateFormDto } from "@app/forms-lib";
import { SpecialtyService } from "@app/specialty";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ClientFormFacade {
    public constructor(
        private readonly formService: ClientFormService,
        private readonly jwtService: JwtService,
        private readonly specialtyService: SpecialtyService
    ) {}

    public async createForm(createFormDto: CreateFormDto, token: string) {
        const { id } = await this.jwtService.verifyTokenStrategy(token);
        const specialist_id = await this.specialtyService.getIdByName(createFormDto.relevant_specialist_name);

        return this.formService.createForm({
            client_id: id,
            description: createFormDto.description,
            relevant_specialist: specialist_id
        });
    }
}