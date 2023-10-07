import { SesService } from "@app/aws";
import { Body, Controller, Get, HttpCode, HttpStatus, Post, UsePipes } from "@nestjs/common";
import { JoiValidationPipe } from "./pipes";
import { SignUpClientSchema } from "@app/client-lib/lib/schemas";
import { SignUpClientDto } from "@app/client-lib/lib/dtos";

@Controller()
export class ClientAuthController {
  
  public constructor() {}

  @Post("/sign-in")
  public async signIn() {}

  @Post("/sign-up")
  @HttpCode(HttpStatus.OK)
  @UsePipes(new JoiValidationPipe(SignUpClientSchema))
  public async signUp(@Body() signUpClientDto: SignUpClientDto) {
    return signUpClientDto;
  }

  @Post("/sign-up/verify")
  public async verify() {}

  @Post("/reset-password")
  public async resetPassword() {}

  @Post("/reset-password/verify")
  public async verifyResetPassword() {}
}
