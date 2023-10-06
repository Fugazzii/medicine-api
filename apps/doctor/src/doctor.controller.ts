import { Controller, Post } from '@nestjs/common';

@Controller()
export class DoctorController {
  
  public constructor() {}

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
