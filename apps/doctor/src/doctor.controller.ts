import { PasswordValidationPipe } from "@app/common";
import { CreateDoctorDto, CreateDoctorSchema, SignInDoctorDto } from "@app/doctor-lib";
import { DoctorAuthFacade } from "@app/facade/doctor-auth.facade";
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UsePipes } from "@nestjs/common";
import { ApiConsumes, ApiOperation } from "@nestjs/swagger";

@Controller()
export class DoctorController {
  public constructor(private readonly facade: DoctorAuthFacade) {}

  /**
   * SIGN UP NEW DOCTOR
   */
  @Post("/sign-up")
  @UsePipes(new PasswordValidationPipe(CreateDoctorSchema))
  public async signUp(@Body() signUpDoctor: CreateDoctorDto) {
    const result = await this.facade.signUpDoctor(signUpDoctor);

    return {
      data: result,
      message: "Sent verification link",
      success: true
    };
  }

  /**
   * VERIFY NEW CLIENT 
   */
  @ApiOperation({ summary: "Verify email", description: "Endpoint for verifying email." })
  @ApiConsumes("application/json")
  @Get("/verify/:bytes")
  @HttpCode(HttpStatus.CREATED)
  public async verify(@Param("bytes") bytes: string) {
    const result = await this.facade.verifyDoctor(bytes);

    return {
      data: result,
      message: "Verified",
      success: true
    };
  }

  /**
   * SIGN IN NEW DOCTOR 
   */
  @Post("/sign-in")
  public async signIn(@Body() signInDoctorDto: SignInDoctorDto) {
    const token = await this.facade.signInDoctor(signInDoctorDto);

    return {
      success: true,
      message: "Signed in doctor",
      data: token
    };
  }

  @Post("/reset-password")
  public async resetPassword() {}

  @Post("/reset-password/verify")
  public async verifyResetPassword() {}
}
