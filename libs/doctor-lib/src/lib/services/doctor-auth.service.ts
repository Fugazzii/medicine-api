import { Inject, Injectable } from '@nestjs/common';
import { ClientRepositoryInterface } from '@app/client-lib/lib/repositories';
import { randomUUID } from 'node:crypto';
import { MAIL_SENDER_TOKEN, MailSenderInterface } from '@app/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from "bcrypt";
import { CreateDoctorDto } from '../dtos/doctor-create';
import { DOCTOR_REPOSITORY_TOKEN } from '../repositories';

@Injectable()
export class DoctorAuthService {

    public constructor(
        @Inject(DOCTOR_REPOSITORY_TOKEN) private readonly doctorRepository: ClientRepositoryInterface,
        @Inject(MAIL_SENDER_TOKEN) private readonly mailSenderService: MailSenderInterface,
        private readonly configService: ConfigService
    ) {}

    public async addNewDoctor(newDoctor: CreateDoctorDto): Promise<void> {
        return this.doctorRepository.save(newDoctor);
    }

    public async doctorExists(id: number): Promise<boolean>;
    public async doctorExists(email: string): Promise<boolean>;
    public async doctorExists(arg: string | number): Promise<boolean> {
        const result = await this.doctorRepository.findOne(arg);
        return Boolean(result);
    }

    public async sendVerificationLink(signUpDoctor: CreateDoctorDto): Promise<string> {
        
        const bytes = randomUUID();
        
        await this.mailSenderService
        .sendMail(
          signUpDoctor.email, 
          `Please verify your email`,
          `${this.configService.get<string>("HOSTNAME")}/api/client/verify/${bytes}`
        );

        return bytes;
    }

    public async passwordsMatch(email: string, password: string): Promise<number> {
        
        const doctor = await this.doctorRepository.findOne(email);
        if(!doctor) {
            throw new Error("Doctor is not registered");
        }

        const isMatch = await bcrypt.compare(password, doctor.password);
        if(!isMatch) {
            throw new Error("Passwords do not match");
        }

        return doctor.id;
    }

}
