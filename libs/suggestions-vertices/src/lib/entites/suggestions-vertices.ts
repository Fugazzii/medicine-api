import { DoctorVertex } from "@app/common";

export interface SuggestionVerticeEntity {
    form_id: number;
    suggestion_vertices: Array<DoctorVertex>;
}