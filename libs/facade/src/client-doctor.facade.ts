import { ClientAuthService } from "@app/client-lib";
import { JwtService } from "@app/common";
import { NatsService } from "@app/nats";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class ClientDoctorFacade {
    public constructor(
        private readonly broker: NatsService,
        private readonly clientService: ClientAuthService,
        private readonly jwtService: JwtService
    ) {}

    public async getMatchingDoctors(formId: number, token: string) {
        const { id } = await this.jwtService.verifyTokenStrategy(token);
        const client = await this.clientService.findOne(id);

        if(!client) {
            throw new UnauthorizedException();
        }
        const msg = JSON.stringify({ id: formId });
        return this.broker.publishMessage("matching_doctors.input", msg);
    }

}