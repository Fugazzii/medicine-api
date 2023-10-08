import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtSignOptions, JwtVerifyOptions, JwtService as NestJwtService } from "@nestjs/jwt";
import { JwtPayload } from "../interfaces";

@Injectable()
export class JwtService {

    private readonly secret: string;
    private readonly expiresIn: string;    

    public constructor(
        private readonly jwtService: NestJwtService,
        private readonly configService: ConfigService
    ) {
        // Get JWT configurations from env
        this.secret = this.configService.get<string>("JWT_SECRET");
        this.expiresIn = this.configService.get<string>("JWT_EXPIRES_IN");        
    }

    public async signInStrategy(id: number) {
        
        // Handle Payload
        const payload: JwtPayload = { id };
        
        const options: JwtSignOptions = {
            secret: this.secret,
            expiresIn: this.expiresIn
        };

        return this.jwtService.signAsync(payload, options);
    }

    public async verifyTokenStrategy(token: string) {
        const options: JwtVerifyOptions = { secret: this.secret };
        return this.jwtService.verifyAsync(token, options);
    }
    
}