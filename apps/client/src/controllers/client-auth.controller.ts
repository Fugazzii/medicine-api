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
import { SignUpClientValidationPipe } from "../../../../libs/client-lib/src/lib/pipes";
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ClientAuthFacade } from "@app/facade";
import { PasswordValidationPipe } from "@app/common";

@ApiTags("Authorization")
@Controller()
export class ClientAuthController {
  
  public constructor(private readonly facade: ClientAuthFacade) {}

  /**
   * SIGN UP NEW CLIENT 
   */
  @ApiOperation({ summary: "Sign Up", description: "Endpoint for client registration." })
  @ApiConsumes("application/json")
  @ApiBody({ type: SignUpClientDto })
  @Post("/sign-up")
  @UsePipes(new PasswordValidationPipe(SignUpClientSchema))
  @UsePipes(new SignUpClientValidationPipe(SignUpClientSchema))
  @HttpCode(HttpStatus.OK)
  public signUp(@Body() signUpClientDto: SignUpClientDto) {
    return this.facade.signUpClient(signUpClientDto);
  }

  /**
   * VERIFY CLIENT
   */
  @ApiOperation({ summary: "Verify email", description: "Endpoint for verifying email." })
  @ApiConsumes("application/json")
  @Get("/verify/:bytes")
  @HttpCode(HttpStatus.CREATED)
  public verify(@Param("bytes") bytes: string) {
    return this.facade.verifyClient(bytes)
  }

  /**
   * SIGN IN NEW CLIENT
   */
  @ApiOperation({ summary: "Sign in", description: "Endpoint for client sign in." })
  @ApiConsumes("application/json")
  @ApiBody({ type: SignInClientDto })
  @Post("/sign-in")
  @HttpCode(HttpStatus.ACCEPTED)
  public signIn(@Body() signInClientDto: SignInClientDto) {
    return this.facade.signInClient(signInClientDto);
  }

  @Post("/reset-password")
  @UseGuards(AuthClientGuard)
  public async resetPassword() {}

  @Post("/reset-password/verify")
  public async verifyResetPassword() {}
}
