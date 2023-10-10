/**
 * Nest imports
 */
import { Injectable } from "@nestjs/common";

/**
 * Lib imports
 */
import { RedisService } from "@app/redis";
import { JwtService } from "@app/common";
import { CreateDoctorDto, DoctorAuthService, SignInDoctorDto } from "@app/doctor-lib";

@Injectable()
export class DoctorAuthFacade {

  public constructor(
    private readonly doctorAuthService: DoctorAuthService,
    private readonly redisService: RedisService,
    private readonly jwtService: JwtService
  ) {}

  public async signUpDoctor(createDoctorDto: CreateDoctorDto): Promise<void> {
    try {
      const exists = await this.doctorAuthService.doctorExists(createDoctorDto.email);

      if(exists) {
        throw new Error("User already exists");
      }

      const bytes = await this.doctorAuthService.sendVerificationLink(createDoctorDto);
      await this.redisService.set(bytes, JSON.stringify(createDoctorDto), 1000 * 60 * 3);

    } catch (error) {
      console.error(error);
      return error;
    }
  }

  public async verifyDoctor(bytes: string): Promise<void> {
    try {
      const signUpOptionsStringed = await this.redisService.get(bytes);
      const signUpOptions = await JSON.parse(signUpOptionsStringed);
  
      if(!signUpOptions) {
        throw new Error("Not found");
      }
  
      await this.doctorAuthService.addNewDoctor(signUpOptions);        
    } catch (error) {
      console.error(`Failed to verify doctor: ${error}`);
      throw error;
    }
  }

  public async signInDoctor(signInDoctor: SignInDoctorDto) {

    try {
      const id = await this.doctorAuthService.passwordsMatch(signInDoctor.email, signInDoctor.password);
      const token = await this.jwtService.signInStrategy(id);

      return {
        data: token,
        success: true,
        message: "Signed in successfully"
      };
    } catch (error) {
      console.error(`Failed to sign in ${error}`);
      return {
        data: null,
        success: false,
        message: "Invalid Credentials"
      }      
    }

  
  }
}

/**
curl -X POST -H "Content-Type: application/json" -d '{
  "private_id": "12345678901",
  "email": "sichinavailia@gmail.com",
  "password": "ILia#uteslisesi123",
  "age": 30
}' http://localhost:3001/api/client/sign-up

 */