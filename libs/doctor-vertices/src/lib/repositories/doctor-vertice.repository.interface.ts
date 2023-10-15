import { DoctorVerticeEntity } from "../entities";

export const DOCTOR_VERTICE_DYNAMO_DB_REPOSITORY_TOKEN = Symbol("DOCTOR_VERTICE_DYNAMO_DB_REPOSITORY_TOKEN");

export interface DoctorVerticeRepositoryInterface {
    insert(doctorVerticeEntity: DoctorVerticeEntity): Promise<void>;
    findOne(doctor_id: number): Promise<DoctorVerticeEntity>;
    findAll(): Promise<Array<DoctorVerticeEntity>>;
}
