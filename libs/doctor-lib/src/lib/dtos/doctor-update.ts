export interface DoctorUpdateDto {
    id: number;
    password?: string;
    age?: number;
    gender?: boolean;
    experience_in_years?: number;
    price_in_dollars?: number;
    specialty?: number;
    city?: number;
}
