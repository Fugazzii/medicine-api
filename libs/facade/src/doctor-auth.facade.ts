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
import { JwtService } from "@app/common";
import {
    CreateDoctorDto,
    DoctorAuthService,
    DoctorEntity,
    SignInDoctorDto
} from "@app/doctor-lib";
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
            const exists = await this.doctorAuthService.doctorExists(
                createDoctorDto.email
            );

            if (exists) {
                throw new ConflictException("Doctor already exists");
            }

            const specialty_id = await this.specialtyService.getIdByName(
                createDoctorDto.specialty
            );
            const city_id = await this.cityService.getIdByName(
                createDoctorDto.city
            );

            const doctorEntity: Omit<DoctorEntity, "id"> = {
                ...createDoctorDto,
                city: city_id,
                specialty: specialty_id,
                rating: this.doctorAuthService.generateRandomRating()
            };

            const bytes = await this.doctorAuthService.sendVerificationLink(
                doctorEntity
            );
            await this.redisService.set(
                bytes,
                JSON.stringify(doctorEntity),
                1000 * 60 * 3
            );

            return {
                data: null,
                message: "Verification link has been sent.",
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

    public async verifyDoctor(bytes: string) {
        try {
            const signUpOptionsStringed = await this.redisService.get(bytes);
            const signUpOptions = await JSON.parse(signUpOptionsStringed);

            if (!signUpOptions) {
                throw new NotFoundException();
            }

            await this.doctorAuthService.addNewDoctor(signUpOptions);
            await this.redisService.remove(bytes);

            return {
                data: null,
                message: "Verified",
                success: true
            };
        } catch (error) {
            return {
                error,
                message: "Failed to verify doctor",
                success: false
            };
        }
    }

    public async signInDoctor(signInDoctor: SignInDoctorDto) {
        try {
            const id = await this.doctorAuthService.passwordsMatch(
                signInDoctor.email,
                signInDoctor.password
            );
            const token = await this.jwtService.signInStrategy(id);

            return {
                success: true,
                message: "Signed in doctor",
                data: token
            };
        } catch (error) {
            return {
                error,
                message: "Failed to sign in doctor",
                success: false
            };
        }
    }
}
