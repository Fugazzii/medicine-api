import { ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
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
        const request = await context.switchToHttp().getRequest();
        const token = await request.headers.authorization?.split(' ')[1];
        const { id } = await this.jwtService.verifyTokenStrategy(token);
        
        return this.clientService.clientExists(id);
    }
    
}
