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
        try {
            const { id } = await this.jwtService.verifyTokenStrategy(token);
            const specialist_id = await this.specialtyService.getIdByName(createFormDto.relevant_specialist_name);
    
            return this.formService.createForm({
                client: id,
                description: createFormDto.description,
                relevant_specialist: specialist_id
            });                
        } catch (error) {
            return {
                success: false,
                message: "Error when creating form",
                error
            };        
        }
    }

    public async getForms(token: string) {
        try {
            // client id
            const { id } = await this.jwtService.verifyTokenStrategy(token);
            
            return this.formService.getForms(id);            
        } catch (error) {
            return {
                success: false,
                message: "Error when retrieving forms",
                error
            };        
        }
    }

    public getFormById(formId: number) {
        try {
            return this.formService.getFormById(formId);            
        } catch (error) {
            return {
                error,
                message: "Failed to retrieve form",
                success: false
            };
        }
    }

    public deleteForm(formId: number) {
        try {
            return this.formService.deleteForm(formId);            
        } catch (error) {
            return {
                success: false,
                message: "Error when deleting form",
                error
            };        
        }
    }
}