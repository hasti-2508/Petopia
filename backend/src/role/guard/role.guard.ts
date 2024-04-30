import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../role.enum';


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers['authorization'];
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      return false;
    }
    const jwtToken = authorizationHeader.split(' ')[1];
    try {
      const decodedToken = this.jwtService.verify(jwtToken);
      const userRole: Role = decodedToken.role;
      return requiredRoles.includes(userRole);
    } catch (error) {
      console.error('Error validating JWT token:', error);
      return false;
    }
  }
}
