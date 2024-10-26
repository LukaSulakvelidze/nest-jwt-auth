import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = this.getToken(request.headers);
      if (!token) throw new UnauthorizedException();
      const payload = await this.jwtService.verifyAsync(token);
      request.userId = payload.sub;
      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  getToken(header) {
    if (!header['authorization']) return;
    const [type, token] = header['authorization'].split(' ');
    return type === 'Bearer' && token;
  }
}
