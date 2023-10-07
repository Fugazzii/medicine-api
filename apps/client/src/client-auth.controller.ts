import { Body, Controller, Get, HttpCode, HttpStatus, Post, UsePipes } from "@nestjs/common";
import { JoiValidationPipe } from "./pipes";
import { SignUpClientSchema } from "@app/client-lib/lib/schemas";
import { SignUpClientDto } from "@app/client-lib/lib/dtos";
import { ClientAuthService } from "@app/client-lib/lib/services";

@Controller()
export class ClientAuthController {
  
  public constructor(
    private readonly clientAuthService: ClientAuthService
  ) {}

  @Post("/sign-in")
  public async signIn() {}

  @Post("/sign-up")
  @HttpCode(HttpStatus.OK)
  @UsePipes(new JoiValidationPipe(SignUpClientSchema))
  public async signUp(@Body() signUpClientDto: SignUpClientDto) {
    /**
     * Check if user already exists
     * Add new one
     */
    try {
      return await this.clientAuthService.signUpNewClient(signUpClientDto);
    } catch (error) {
      return error;
    }
  }

  @Post("/sign-up/verify")
  public async verify() {}

  @Post("/reset-password")
  public async resetPassword() {}

  @Post("/reset-password/verify")
  public async verifyResetPassword() {}
}
