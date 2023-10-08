/**
 * Nest imports
 */
import { Injectable } from "@nestjs/common";

/**
 * Lib imports
 */
import { RedisService } from "@app/redis";
import { SignUpClientDto } from "@app/client-lib/lib/dtos";
import { ClientAuthService } from "@app/client-lib/lib/services";

@Injectable()
export class ClientAuthFacade {

  public constructor(
    private readonly clientAuthService: ClientAuthService,
    private readonly redisService: RedisService
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
    const signUpOptionsStringed = await this.redisService.get(bytes);
    const signUpOptions = await JSON.parse(signUpOptionsStringed);

    if(!signUpOptions) {
      throw new Error("Not found");
    }

    await this.clientAuthService.addNewClient(signUpOptions);
  }
}

/**
curl -X POST -H "Content-Type: application/json" -d '{
  "private_id": "12345678901",
  "email": "example@example.com",
  "password": "ILia#uteslisesi123",
  "age": 30
}' http://localhost:3001/api/client/sign-up

 */