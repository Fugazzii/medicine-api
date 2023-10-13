export interface DoctorEntity {
    id: number;
    private_id: string;
    email: string;
    password: string;
    age: number;
    gender: boolean;
    experience_in_years: number;
    price_in_dollars: number;
    rating: number;

    // Relations
    specialty: number;
    city: number;
}
