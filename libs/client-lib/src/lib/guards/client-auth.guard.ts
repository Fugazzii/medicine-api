import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { ClientAuthService } from "../services";
import { JwtService } from "@app/common/lib/services";

@Injectable()
export class AuthClientGuard extends AuthGuard("bearer") {
  
    public constructor(
        private readonly clientService: ClientAuthService,
        private readonly jwtService: JwtService
    ) {
        super();
    }

    public async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1];
        const { id } = await this.jwtService.verifyTokenStrategy(token);

        return this.clientService.clientExists(id);
    }
    
}
