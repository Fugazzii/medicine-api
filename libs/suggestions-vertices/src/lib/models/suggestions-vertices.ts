import { DoctorVerticeEntity } from "@app/doctor-vertices";
import { SuggesstionVerticeEntity } from "../entites";

export class SuggestionVerticeModel implements SuggesstionVerticeEntity {
    public form_id: number;
    public suggestion_vertices: DoctorVerticeEntity[];
}