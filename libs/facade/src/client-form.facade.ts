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
    
            await this.formService.createForm({
                client: id,
                description: createFormDto.description,
                relevant_specialist: specialist_id
            });
            
            return {
                data: null,
                message: "Created new form",
                success: true
            };
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
            
            const result = await this.formService.getForms(id);            
        
            return {
                data: result,
                message: "Retrieved forms",
                success: true
            };
        } catch (error) {
            return {
                success: false,
                message: "Error when retrieving forms",
                error
            };        
        }
    }

    public async getFormById(formId: number) {
        try {
            const result = await this.formService.getFormById(formId);            
            return {
                data: result,
                message: "Retrieved form",
                success: true
            };          
        } catch (error) {
            return {
                error,
                message: "Failed to retrieve form",
                success: false
            };
        }
    }

    public async deleteForm(formId: number) {
        try {
            await this.formService.deleteForm(formId);            
            return {
                data: null,
                message: "Deleted form",
                success: true
            }
        } catch (error) {
            return {
                error,
                message: "Error when deleting form",
                success: false
            };        
        }
    }
}