import { ApiProperty } from "@nestjs/swagger";

export class CreateFormDto {
    @ApiProperty({ example: 102 })
    public client_id?: number;

    @ApiProperty({ example: "this is desc" })
    public description: string;

    @ApiProperty({ example: "Cardiologist" })
    public relevant_specialist_name: string;

    @ApiProperty({ example: 1000 })
    public price_from: number;

    @ApiProperty({ example: 2000 })
    public price_to: number;

    @ApiProperty({ example: "Tbilisi" })
    public city: string;
}
