import { CreateDoctorDto, SignInDoctorDto } from "@app/doctor-lib";
import { DoctorAuthFacade } from "@app/facade/doctor-auth.facade";
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { ApiConsumes, ApiOperation } from "@nestjs/swagger";

@Controller()
export class DoctorController {
  public constructor(private readonly facade: DoctorAuthFacade) {}

  @Post("/sign-up")
  public async signUp(@Body() signUpDoctor: CreateDoctorDto) {
    try {
      const result = await this.facade.signInDoctor(signUpDoctor);

      return {
        data: result,
        message: "Sent verification link",
        success: true
      };
    } catch (error) {
      return {
        error,
        message: "Failed to add doctor",
        success: false
      };      
    }
  }

  @ApiOperation({ summary: "Verify email", description: "Endpoint for verifying email." })
  @ApiConsumes("application/json")
  @Get("/verify/:bytes")
  @HttpCode(HttpStatus.CREATED)
  public async verify(@Param("bytes") bytes: string) {
      try {
        const result = await this.facade.verifyDoctor(bytes);

        return {
          data: result,
          message: "Verified",
          success: true
        };
      } catch (error) {
        return {
          error,
          message: "Verified",
          success: false
        };        
      }
  }

  @Post("/sign-in")
  public async signIn(@Body() signInDoctorDto: SignInDoctorDto) {
    try {
      const token = await this.facade.signInDoctor(signInDoctorDto);

      return {
        success: true,
        message: "Signed in doctor",
        data: token
      };        
    } catch (error) {
      return {
        error,
        success: false,
        message: "Signed in doctor",
      };              
    }
  }

  @Post("/reset-password")
  public async resetPassword() {}

  @Post("/reset-password/verify")
  public async verifyResetPassword() {}
}
