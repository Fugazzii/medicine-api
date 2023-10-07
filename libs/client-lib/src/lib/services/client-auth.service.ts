import { Inject, Injectable } from "@nestjs/common";
import { ClientRepositoryInterface } from "../repositories";
import { ORM_SOURCE_TOKEN } from "../tokens";
import { SignUpClientDto } from "../dtos";
import { ClientEntity } from "../entities";

@Injectable()
export class ClientAuthService {

    public constructor(
        @Inject(ORM_SOURCE_TOKEN) private readonly clientRepository: ClientRepositoryInterface
    ) {}
    
    public signUpNewClient(newClient: SignUpClientDto): Promise<void> {
        return this.clientRepository.save(newClient);
    }
}