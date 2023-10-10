import { DeleteDoctorDto } from "../dtos/doctor-delete";
import { DoctorUpdateDto } from "../dtos/doctor-update";
import { DoctorEntity } from "../entities";

export const DOCTOR_REPOSITORY_TOKEN = Symbol("DOCTOR_REPOSITORY_TOKEN");

export interface DoctorRepositoryInterface {
    create(newDoctor: Omit<DoctorEntity, "id">): Promise<void>;

    findOne(id: number): Promise<DoctorEntity>;
    findOne(email: string): Promise<DoctorEntity>;
    findOne(arg: number | string): Promise<DoctorEntity>;
    
    deleteOne(deleteDoctorDto: DeleteDoctorDto): Promise<void>;
    update(id: number, doctorUpdateDto: DoctorUpdateDto): Promise<DoctorEntity>;
}