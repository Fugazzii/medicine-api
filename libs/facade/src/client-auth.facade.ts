/**
 * Nest imports
 */
import {
    ConflictException,
    Injectable,
    NotFoundException
} from "@nestjs/common";

/**
 * Lib imports
 */
import { RedisService } from "@app/redis";
import { SignInClientDto, SignUpClientDto } from "@app/client-lib/lib/dtos";
import { ClientAuthService } from "@app/client-lib/lib/services";
import { JwtService } from "@app/common/lib/services";
import { KmsService } from "@app/aws";

@Injectable()
export class ClientAuthFacade {
    public constructor(
        private readonly clientAuthService: ClientAuthService,
        private readonly redisService: RedisService,
        private readonly jwtService: JwtService,
        private readonly kmsService: KmsService
    ) {}

    public async signUpClient(signUpClientDto: SignUpClientDto) {
        try {
            const exists = await this.clientAuthService.clientExists(
                signUpClientDto.email
            );

            if (exists) {
                throw new ConflictException("User is already registered");
            }

            const bytes = await this.clientAuthService.sendVerificationLink(
                signUpClientDto
            );
            await this.redisService.set(
                bytes,
                JSON.stringify(signUpClientDto),
                1000 * 60 * 3
            );

            return {
                data: null,
                message: "Verification link has been sent",
                success: true
            };
        } catch (error) {
            return {
                error,
                message: "Error during signing up",
                success: false
            };
        }
    }

    public async verifyClient(bytes: string) {
        try {
            const signUpOptionsStringed = await this.redisService.get(bytes);
            const signUpOptions: SignUpClientDto = await JSON.parse(
                signUpOptionsStringed
            );

            if (!signUpOptions) {
                throw new NotFoundException();
            }
            const obj = { ...signUpOptions };

            for (const key in obj) {
                if (typeof obj[key] !== "string") continue;
                const encrypted = await this.kmsService.encrypt(
                    Buffer.from(obj[key])
                );
                obj[key] = encrypted.toString("base64");
            }

            await this.clientAuthService.addNewClient(obj);
            await this.redisService.remove(bytes);

            return {
                data: null,
                message: "Verified",
                success: true
            };
        } catch (error) {
            return {
                error,
                message: "Failed to verify",
                success: false
            };
        }
    }

    public async signInClient(signInClientDto: SignInClientDto) {
        try {
            const id = await this.clientAuthService.passwordsMatch(
                signInClientDto.email,
                signInClientDto.password
            );
            const token = await this.jwtService.signInStrategy(id);

            return {
                data: token,
                message: "Logged in",
                success: true
            };
        } catch (error) {
            return {
                data: null,
                message: "Invalid Credentials",
                success: false
            };
        }
    }
}
