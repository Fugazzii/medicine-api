import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UsePipes } from "@nestjs/common";
import { JoiValidationPipe } from "../pipes";
import { SignUpClientSchema } from "@app/client-lib/lib/schemas";
import { SignUpClientDto } from "@app/client-lib/lib/dtos";
import { ClientAuthFacade } from "../facade";

@Controller()
export class ClientAuthController {
  
  public constructor(
    private readonly facade: ClientAuthFacade
  ) {}

  @Post("/sign-in")
  public async signIn() {}

  @Post("/sign-up")
  @HttpCode(HttpStatus.OK)
  @UsePipes(new JoiValidationPipe(SignUpClientSchema))
  public async signUp(@Body() signUpClientDto: SignUpClientDto) {

    await this.facade.signUpClient(signUpClientDto)

    return {
      success: true,
      message: `Verification link sent to ${signUpClientDto.email}`
    };
  }

  @Get("/verify/:bytes")
  @HttpCode(HttpStatus.CREATED)
  public async verify(@Param("bytes") bytes: string) {

    await this.facade.verifyClient(bytes)
      
    return {
      success: true,
      message: "Successfully added new user"
    };
  }

  @Post("/reset-password")
  public async resetPassword() {}

  @Post("/reset-password/verify")
  public async verifyResetPassword() {}
}
