import { Inject, Injectable, Scope } from "@nestjs/common";
import { ClientRepositoryInterface } from "../repositories";
import { MAIL_SENDER_TOKEN, ORM_SOURCE_TOKEN } from "../tokens";
import { SignUpClientDto } from "../dtos";
import { MailSenderInterface } from "../providers";
import { randomUUID } from "node:crypto";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ClientAuthService {

    public constructor(
        @Inject(ORM_SOURCE_TOKEN) private readonly clientRepository: ClientRepositoryInterface,
        @Inject(MAIL_SENDER_TOKEN) private readonly mailSenderService: MailSenderInterface,
        private readonly configService: ConfigService
    ) {}
    
    public async addNewClient(newClient: SignUpClientDto): Promise<void> {
        return this.clientRepository.save(newClient);
    }

    public async clientExists(email: string): Promise<boolean> {
        const result = await this.clientRepository.findOne(email);
        return Boolean(result);
    }

    public async sendVerificationLink(signUpClientDto: SignUpClientDto): Promise<string> {
        
        const bytes = randomUUID();
        
        await this.mailSenderService
        .sendMail(
          signUpClientDto.email, 
          `Please verify your email`,
          `${this.configService.get<string>("HOSTNAME")}/api/client/verify/${bytes}`
        );

        return bytes;
    }

}