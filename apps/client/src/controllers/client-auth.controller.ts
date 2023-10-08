/**
 * Nest imports
 */
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UsePipes } from "@nestjs/common";

/**
 * Lib imports
 */
import { SignUpClientSchema } from "@app/client-lib/lib/schemas";
import { SignInClientDto, SignUpClientDto } from "@app/client-lib/lib/dtos";

/**
 * Local imports
 */
import { JoiValidationPipe } from "../pipes";
import { ClientAuthFacade } from "../facade";

@Controller()
export class ClientAuthController {
  
  public constructor(
    private readonly facade: ClientAuthFacade
  ) {}

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

  @Post("/sign-in")
  public async signIn(@Body() signInClientDto: SignInClientDto) {

    const token = await this.facade.signInClient(signInClientDto);

    return {
      success: true,
      message: "Signed in client",
      data: token
    };
  }

  @Post("/reset-password")
  public async resetPassword() {}

  @Post("/reset-password/verify")
  public async verifyResetPassword() {}
}
