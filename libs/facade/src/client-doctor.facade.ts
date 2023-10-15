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
        const _ = await this._checkAuthorized(token);

        const msg = JSON.stringify({ id: formId });
        return this.broker.publishMessage("matching_doctors.input", msg);
    }

    public async hideDoctor(doctorId: number, token: string) {
        const client = await this._checkAuthorized(token);

        const msg = {
            clientId: client.id,
            doctorId: doctorId
        };

        this.broker.publish("hide_doctor", JSON.stringify(msg));
    
        return {
            success: true,
            message: "Doctor hidden",
            data: null
        };
    }

    public async showDoctor(doctorId: number, token: string) {
        const client = await this._checkAuthorized(token);

        const msg = {
            clientId: client.id,
            doctorId: doctorId
        };

        this.broker.publish("show_doctor", JSON.stringify(msg));
    
        return {
            success: true,
            message: "Doctor unhidden",
            data: null
        };
    }

    /**
     * 
     * PRIVATE 
     * 
     */

    private async _checkAuthorized(token: string) {
        const { id } = await this.jwtService.verifyTokenStrategy(token);
        const client = await this.clientService.findOne(id);

        if(!client) {
            throw new UnauthorizedException();
        }

        return client;
    }

}