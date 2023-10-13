import { Inject, Injectable } from "@nestjs/common";
import { DOCTOR_VERTICE_DYNAMO_DB_REPOSITORY_TOKEN, DoctorVerticeRepositoryInterface } from "../repositories";
import { DoctorVerticeEntity } from "../entities";

@Injectable()
export class DoctorVerticesService {
    public constructor(
        @Inject(DOCTOR_VERTICE_DYNAMO_DB_REPOSITORY_TOKEN) private readonly doctorVerticeRepository: DoctorVerticeRepositoryInterface
    ) {}
   
    public async findOne(id: number) {
        return this.doctorVerticeRepository.findOne(id);
    }
    
    public async insert(doctorVerticeEntity: DoctorVerticeEntity) {
        return this.doctorVerticeRepository.insert(doctorVerticeEntity);
    }
}