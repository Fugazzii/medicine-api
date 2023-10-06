import { SesService } from "@app/aws";
import { Controller, Get, Post } from "@nestjs/common";

@Controller()
export class ClientAuthController {
  
  public constructor(private readonly sesService: SesService) {}

  @Get("/ping")
  public async ping() {
    this.sesService.sendMail("sichinavaili@gmail.com", "zd yleo", "ravaxar")
  }

  @Post("/sign-in")
  public async signIn() {}

  @Post("/sign-up")
  public async signUp() {}

  @Post("/sign-up/verify")
  public async verify() {}

  @Post("/reset-password")
  public async resetPassword() {}

  @Post("/reset-password/verify")
  public async verifyResetPassword() {}
}
