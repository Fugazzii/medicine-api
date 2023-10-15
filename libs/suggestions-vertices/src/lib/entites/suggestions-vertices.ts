import { DoctorVerticeEntity } from "@app/doctor-vertices";

export interface SuggestionVerticeEntity {
    form_id: number;
    suggestion_vertices: Array<DoctorVerticeEntity>;
}