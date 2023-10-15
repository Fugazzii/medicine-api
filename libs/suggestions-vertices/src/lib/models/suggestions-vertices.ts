import { DoctorVerticeEntity } from "@app/doctor-vertices";
import { DoctorVertex } from "@app/common";
import { SuggestionVerticeEntity } from "../entites";

export class SuggestionVerticeModel implements SuggestionVerticeEntity {
    public form_id: number;
    public suggestion_vertices: Array<DoctorVertex>;
}