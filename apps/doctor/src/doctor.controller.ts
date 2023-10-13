import { PasswordValidationPipe } from "@app/common";
import {
    CreateDoctorDto,
    CreateDoctorSchema,
    SignInDoctorDto
} from "@app/doctor-lib";
import { DoctorAuthFacade } from "@app/facade/doctor-auth.facade";
import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    UsePipes
} from "@nestjs/common";
import { ApiConsumes, ApiOperation } from "@nestjs/swagger";

@Controller()
export class DoctorController {
    public constructor(private readonly facade: DoctorAuthFacade) {}

    /**
     * SIGN UP NEW DOCTOR
     */
    @ApiOperation({
        summary: "Sign up new doctor",
        description: "Endpoint for signing up new doctor."
    })
    @ApiConsumes("application/json")
    @Post("/sign-up")
    @UsePipes(new PasswordValidationPipe(CreateDoctorSchema))
    @HttpCode(HttpStatus.ACCEPTED)
    public signUp(@Body() signUpDoctor: CreateDoctorDto) {
        return this.facade.signUpDoctor(signUpDoctor);
    }

    /**
     * VERIFY NEW CLIENT
     */
    @ApiOperation({
        summary: "Verify email",
        description: "Endpoint for verifying email."
    })
    @ApiConsumes("application/json")
    @Get("/verify/:bytes")
    @HttpCode(HttpStatus.CREATED)
    public verify(@Param("bytes") bytes: string) {
        return this.facade.verifyDoctor(bytes);
    }

    /**
     * SIGN IN NEW DOCTOR
     */
    @ApiOperation({
        summary: "Sign in",
        description: "Endpoint for logging in."
    })
    @ApiConsumes("application/json")
    @Post("/sign-in")
    @HttpCode(HttpStatus.OK)
    public signIn(@Body() signInDoctorDto: SignInDoctorDto) {
        return this.facade.signInDoctor(signInDoctorDto);
    }

    @Post("/reset-password")
    public async resetPassword() {}

    @Post("/reset-password/verify")
    public async verifyResetPassword() {}
}
