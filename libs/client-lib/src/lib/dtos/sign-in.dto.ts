import { ApiProperty } from "@nestjs/swagger";

export class SignInClientDto {
    @ApiProperty({ example: "sichinavailia@gmail.com" })
    public email: string;

    @ApiProperty({ example: "YourPreExistingPassword123" })
    public password: string;
}