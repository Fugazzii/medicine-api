/**
 * Abstract entity for all kind of ORMs
 */

export interface ClientEntity {
    id: number;
    email: string;
    password: string;
    private_id: string;
}
