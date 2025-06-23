import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RequestWithUser } from '../interfaces/request-user';
import { JwtService } from 'src/jwt/jwt.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request: RequestWithUser = context.switchToHttp().getRequest();
      const authHeader = request.headers.authorization;

      if (!authHeader) {
        throw new UnauthorizedException('No se encontró el token de autorización');
      }

      // Soportar 'Bearer token' o solo 'token' por si acaso
      const token = authHeader.startsWith('Bearer ')
        ? authHeader.slice(7)
        : authHeader;

      if (!token) {
        throw new UnauthorizedException('Token vacío');
      }

      const payload = this.jwtService.getPayload(token);
      const user = await this.usersService.findByEmail(payload.email);
      if (!user) {
        throw new UnauthorizedException('Usuario no encontrado');
      }

      request.user = user;

      const requiredPermissions = this.reflector.get<string[]>(
        'permissions',
        context.getHandler(),
      );

      if (!requiredPermissions) {
        return true; // No requiere permisos, acceso permitido
      }

      const hasPermission = () =>
        user.permissionCodes?.some((p) => requiredPermissions.includes(p));

      if (!hasPermission()) {
        throw new UnauthorizedException(
          'No tenés permiso para acceder a este recurso',
        );
      }

      return true;
    } catch (error) {
      throw new UnauthorizedException(error?.message || 'Token inválido');
    }
  }
}
