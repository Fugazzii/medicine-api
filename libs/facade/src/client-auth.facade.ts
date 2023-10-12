/**
 * Nest imports
 */
import { Injectable } from "@nestjs/common";

/**
 * Lib imports
 */
import { RedisService } from "@app/redis";
import { SignInClientDto, SignUpClientDto } from "@app/client-lib/lib/dtos";
import { ClientAuthService } from "@app/client-lib/lib/services";
import { JwtService } from "@app/common/lib/services";

@Injectable()
export class ClientAuthFacade {

  public constructor(
    private readonly clientAuthService: ClientAuthService,
    private readonly redisService: RedisService,
    private readonly jwtService: JwtService
  ) {}

  public async signUpClient(signUpClientDto: SignUpClientDto): Promise<void> {
    try {
      const exists = await this.clientAuthService.clientExists(signUpClientDto.email);

      if(exists) {
        throw new Error("User already exists");
      }

      const bytes = await this.clientAuthService.sendVerificationLink(signUpClientDto);
      await this.redisService.set(bytes, JSON.stringify(signUpClientDto), 1000 * 60 * 3);

    } catch (error) {
      console.error(error);
      return error;
    }
  }

  public async verifyClient(bytes: string): Promise<void> {
    try {
      const signUpOptionsStringed = await this.redisService.get(bytes);
      const signUpOptions = await JSON.parse(signUpOptionsStringed);
  
      if(!signUpOptions) {
        throw new Error("Not found");
      }
  
      await this.clientAuthService.addNewClient(signUpOptions);
      await this.clientAuthService.addNewClient(signUpOptions);    
    } catch (error) {
      console.error(`Failed to verify client: ${error}`);
      throw error;
    }
  }

  public async signInClient(signInClientDto: SignInClientDto) {

    try {
      const id = await this.clientAuthService.passwordsMatch(signInClientDto.email, signInClientDto.password);
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