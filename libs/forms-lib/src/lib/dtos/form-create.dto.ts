import { ApiProperty } from "@nestjs/swagger";

export class CreateFormDto {
    @ApiProperty({ example: 102 })
    public client_id: number;

    @ApiProperty({ example: "this is desc" })
    public description: string;

    @ApiProperty({ example: "Cardiologist" })
    public relevant_specialist_name: string;
}