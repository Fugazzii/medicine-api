import { Inject, Injectable, Scope } from "@nestjs/common";
import { ClientRepositoryInterface } from "../repositories";
import { MAIL_SENDER_TOKEN, ORM_SOURCE_TOKEN } from "../tokens";
import { SignUpClientDto } from "../dtos";
import { MailSenderInterface } from "../providers";
import { randomUUID } from "node:crypto";
import { ConfigService } from "@nestjs/config";
import { ClientEntity } from "../entities";

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

    public async clientExists(id: number): Promise<boolean>;
    public async clientExists(email: string): Promise<boolean>;
    public async clientExists(arg: string | number): Promise<boolean> {
        const result = await this.clientRepository.findOne(arg);
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

    public async passwordsMatch(email: string, password: string): Promise<number> {
        
        // Check if clients exists
        const client = await this.clientRepository.findOne(email);
        if(!client) {
            throw new Error("Client is not registered");
        }

        // Compare passwords
        const isMatch = client.password === password;
        if(!isMatch) {
            throw new Error("Passwords do not match");
        }

        return client.id;
    }

}