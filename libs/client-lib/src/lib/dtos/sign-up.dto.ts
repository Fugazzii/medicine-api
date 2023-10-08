import { ApiProperty } from "@nestjs/swagger";

export class SignUpClientDto {
  @ApiProperty({ example: "12345678901" })
  public private_id: string;

  @ApiProperty({ example: "sichinavailia@gmail.com" })
  public email: string;

  @ApiProperty({ example: "YourPreExistingPassword123" })
  public password: string;

  @ApiProperty({ example: 30 })
  public age: number;
}