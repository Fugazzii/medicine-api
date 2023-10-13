import { Vertex } from "@app/common";
import { DoctorVerticeEntity } from "../entities";

export class DoctorDynamoDbVerticeModel implements DoctorVerticeEntity {
    id: number;
    key: number;
    doctor_id: number;
    vertex: Vertex;
}
