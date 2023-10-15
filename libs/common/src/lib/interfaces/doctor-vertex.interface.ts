import { Vertex } from "./vertex.interface";

export interface DoctorVertex extends Vertex {
    doctor_id: number;
    isHidden: boolean;
}