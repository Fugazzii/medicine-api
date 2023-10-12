/**
 * Nest imports
 */
import { Injectable } from "@nestjs/common";

/**
 * Lib imports
 */
import { RedisService } from "@app/redis";
import { JwtService } from "@app/common";
import { CreateDoctorDto, DoctorAuthService, DoctorEntity, SignInDoctorDto } from "@app/doctor-lib";
import { SpecialtyService } from "@app/specialty";
import { CityLibService } from "@app/city-lib";

@Injectable()
export class DoctorAuthFacade {

  public constructor(
    private readonly doctorAuthService: DoctorAuthService,
    private readonly redisService: RedisService,
    private readonly jwtService: JwtService,
    private readonly specialtyService: SpecialtyService,
    private readonly cityService: CityLibService
  ) {}

  public async signUpDoctor(createDoctorDto: CreateDoctorDto) {
    try {
      const exists = await this.doctorAuthService.doctorExists(createDoctorDto.email);

      if(exists) {
        throw new Error("User already exists");
      }
  
      const specialty_id = await this.specialtyService.getIdByName(createDoctorDto.specialty);
      const city_id = await this.cityService.getIdByName(createDoctorDto.city);
  
      const doctorEntity: Omit<DoctorEntity, "id"> = {
        ...createDoctorDto,
        city: city_id,
        specialty: specialty_id,
        rating: this.doctorAuthService.generateRandomRating()
      };
      
      const bytes = await this.doctorAuthService.sendVerificationLink(doctorEntity);
      await this.redisService.set(bytes, JSON.stringify(doctorEntity), 1000 * 60 * 3);        
    } catch (error) {
      return {
        error,
        message: "Failed to add doctor",
        success: false
      };      
    }
  }

  public async verifyDoctor(bytes: string) {
    try {
      const signUpOptionsStringed = await this.redisService.get(bytes);
      const signUpOptions = await JSON.parse(signUpOptionsStringed);
      console.log("signup", signUpOptions);
      if(!signUpOptions) {
        throw new Error("Not found");
      }
  
      await this.doctorAuthService.addNewDoctor(signUpOptions);
      await this.redisService.remove(bytes);  
    } catch (error) {
      return {
        error,
        message: "Faield to verify doctor",
        success: false
      };
    }
  }

  public async signInDoctor(signInDoctor: SignInDoctorDto) {
    try {
      const id = await this.doctorAuthService.passwordsMatch(signInDoctor.email, signInDoctor.password);    
      return this.jwtService.signInStrategy(id);        
    } catch (error) {
      return {
        error,
        message: "Failed to sign in doctor",
        success: false
      };
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