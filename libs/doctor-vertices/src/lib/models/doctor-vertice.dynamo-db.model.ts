import { Vertex } from "@app/common";
import { DoctorVerticeEntity } from "../entities";

export class DoctorDynamoDbVerticeModel implements DoctorVerticeEntity {
    doctor_id: number;
    vertex: Vertex;
}
