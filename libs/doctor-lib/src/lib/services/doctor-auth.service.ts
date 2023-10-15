import {
    BadRequestException,
    Inject,
    Injectable,
    UnauthorizedException
} from "@nestjs/common";
import { ClientRepositoryInterface } from "@app/client-lib";
import { randomUUID } from "node:crypto";
import { MAIL_SENDER_TOKEN, MailSenderInterface } from "@app/common";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from "bcrypt";
import { CreateDoctorDto } from "../dtos/doctor-create";
import {
    DOCTOR_REPOSITORY_TOKEN,
    DoctorRepositoryInterface
} from "../repositories";
import { DoctorEntity } from "../entities";

@Injectable()
export class DoctorAuthService {
    public constructor(
        @Inject(DOCTOR_REPOSITORY_TOKEN)
        private readonly doctorRepository: DoctorRepositoryInterface,
        @Inject(MAIL_SENDER_TOKEN)
        private readonly mailSenderService: MailSenderInterface,
        private readonly configService: ConfigService
    ) {}

    public async addNewDoctor(newDoctor: Omit<DoctorEntity, "id">): Promise<void> {
        return this.doctorRepository.create(newDoctor);
    }

    public async findDoctor(email: string) {
        return this.doctorRepository.findOne(email);
    }

    public async doctorExists(id: number): Promise<boolean>;
    public async doctorExists(email: string): Promise<boolean>;
    public async doctorExists(arg: string | number): Promise<boolean> {
        const result = await this.doctorRepository.findOne(arg);
        return Boolean(result);
    }

    public async sendVerificationLink(
        signUpDoctor: Omit<DoctorEntity, "id">
    ): Promise<string> {
        const bytes = randomUUID();

        await this.mailSenderService.sendMail(
            signUpDoctor.email,
            `Please verify your email`,
            `${this.configService.get<string>(
                "HOSTNAME"
            )}/api/doctor/verify/${bytes}`
        );

        return bytes;
    }

    public async passwordsMatch(
        email: string,
        password: string
    ): Promise<number> {
        const doctor = await this.doctorRepository.findOne(email);
        if (!doctor) {
            throw new UnauthorizedException("Doctor is not registered");
        }

        const isMatch = await bcrypt.compare(password, doctor.password);
        if (!isMatch) {
            throw new BadRequestException("Passwords does not match");
        }

        return doctor.id;
    }

    public generateRandomRating() {
        const randomDecimal = Math.random();

        const min = 1;
        const max = 5;
        const randomRating = Math.floor(randomDecimal * (max - min + 1)) + min;

        return randomRating;
    }
}
