import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtSignOptions, JwtService as NestJwtService } from "@nestjs/jwt";

@Injectable()
export class JwtService {

    public constructor(
        private readonly jwtService: NestJwtService,
        private readonly configService: ConfigService
    ) {}

    public async signInStrategy(id: number) {
        
        // Handle Payload
        const payload = { id };
        
        // Get JWT configurations from env
        const secret = this.configService.get<string>("JWT_SECRET");
        const expiresIn = this.configService.get<string>("JWT_EXPIRES_IN");

        const options: JwtSignOptions = {
            secret,
            expiresIn
        };

        return this.jwtService.signAsync(payload, options);
    }
    
}