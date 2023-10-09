import { InjectRepository } from "@nestjs/typeorm";
import { SpecialtyTypeormModel } from "../../models";
import { Repository } from "typeorm";
import { SpecialtyRepositoryInterface } from "../specialty.repository.interface";
import { SpecialtyEntity } from "../../entities";

export class SpecialtyTypeormRepository implements SpecialtyRepositoryInterface {
    
    private readonly specialtyNames: Array<string>;

    public constructor(
        @InjectRepository(SpecialtyTypeormModel) private readonly repository: Repository<SpecialtyTypeormModel>
    ) {
        this.specialtyNames = [
            "Allergist",
            "Anesthesiologist",
            "Cardiologist",
            "Dermatologist",
            "Endocrinologist",
            "Gastroenterologist",
            "General Practitioner",
            "Hematologist",
            "Infectious Disease Specialist",
            "Internist",
            "Neurologist",
            "Oncologist",
            "Ophthalmologist",
            "Orthopedic Surgeon",
            "Pediatrician",
            "Plastic Surgeon",
            "Psychiatrist",
            "Pulmonologist",
            "Radiologist",
            "Rheumatologist",
            "Urologist"
        ];
        
        this
            .initialize()
            .then(() => {})
            .catch(err => console.error(`Error in specialty repository ${err}`))
    }

    private async initialize(): Promise<void> {
        try {
            const count = await this.repository.count();
            if (count !== 0) return; 
        
            const query = `INSERT INTO specialties (name) VALUES ${this.specialtyNames.map(name => `('${name}')`).join(", ")}`;
            await this.repository.query(query);
        } catch (error) {
            throw error;
        }
    }

    public find(id: number): Promise<SpecialtyEntity>;
    public find(name: string): Promise<SpecialtyEntity>;
    public find(arg: string | number): Promise<SpecialtyEntity> {
        const isName = typeof arg === "string";

        return isName
            ? this.repository.findOneBy({ name: arg }) 
            : this.repository.findOne({ where: { id: arg } })
    }

}