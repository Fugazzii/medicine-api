import { ApiProperty } from "@nestjs/swagger";

export class CreateDoctorDto {
    @ApiProperty({ example: "01001000130" })
    public private_id: string;

    @ApiProperty({ example: "sichinavailia@gmail.com" })
    public email: string;

    @ApiProperty({ example: "IliaUteslesia2003#" })
    public password: string;

    @ApiProperty({ example: 30 })
    public age: number;

    @ApiProperty({ example: true })
    public gender: boolean;

    @ApiProperty({ example: 10 })
    public experience_in_years: number;

    @ApiProperty({ example: 100 })
    public price_in_dollars: number;

    @ApiProperty({ example: "Cardiologist" })
    public specialty: string;

    @ApiProperty({ example: "Tbilisi" })
    public city: string;
}
