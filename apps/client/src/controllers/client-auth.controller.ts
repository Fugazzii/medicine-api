/**
 * Nest imports
 */
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards, UsePipes } from "@nestjs/common";

/**
 * Lib imports
 */
import { SignUpClientSchema } from "@app/client-lib/lib/schemas";
import { SignInClientDto, SignUpClientDto } from "@app/client-lib/lib/dtos";
import { AuthClientGuard } from "@app/client-lib/lib/guards";

/**
 * Local imports
 */
import { ClientAuthFacade } from "../facade";
import { PasswordValidationPipe, SignUpClientValidationPipe } from "../pipes";
import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";

@ApiTags("Authorization")
@Controller()
export class ClientAuthController {
  
  public constructor(
    private readonly facade: ClientAuthFacade
  ) {}

  @ApiOperation({ summary: "Sign Up", description: "Endpoint for client registration." })
  @ApiConsumes("application/json")
  @ApiBody({ type: SignUpClientDto })
  @Post("/sign-up")
  @HttpCode(HttpStatus.OK)
  @UsePipes(new PasswordValidationPipe(SignUpClientSchema))
  @UsePipes(new SignUpClientValidationPipe(SignUpClientSchema))
  public async signUp(@Body() signUpClientDto: SignUpClientDto) {

    await this.facade.signUpClient(signUpClientDto)

    return {
      success: true,
      message: `Verification link sent to ${signUpClientDto.email}`
    };
  }

  @ApiOperation({ summary: "Verify email", description: "Endpoint for verifying email." })
  @ApiConsumes("application/json")
  @Get("/verify/:bytes")
  @HttpCode(HttpStatus.CREATED)
  public async verify(@Param("bytes") bytes: string) {

    await this.facade.verifyClient(bytes)
      
    return {
      success: true,
      message: "Successfully added new user"
    };
  }

  @ApiOperation({ summary: "Sign Up", description: "Endpoint for client registration." })
  @ApiConsumes("application/json")
  @ApiBody({ type: SignInClientDto })
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
  @UseGuards(AuthClientGuard)
  public async resetPassword() {}

  @Post("/reset-password/verify")
  public async verifyResetPassword() {}
}
