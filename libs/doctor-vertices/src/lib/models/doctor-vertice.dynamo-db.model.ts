import { Vertex } from "@app/common";
import { DoctorVerticeEntity } from "../entities";

export class DoctorDynamoDbVerticeModel implements DoctorVerticeEntity {
    public doctor_id: number;
    public vertex: Vertex;
}
