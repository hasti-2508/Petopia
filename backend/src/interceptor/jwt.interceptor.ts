// import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
// import { NextFunction, Request, Response } from 'express';

// declare global {
//     namespace Express {
//       interface Request {
//         token?: string;
//       }
//     }
//   }

// @Injectable()
// export class JwtMiddleware implements NestMiddleware {
//   use(req: Request, res: Response, next: NextFunction) {
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       throw new UnauthorizedException('Bearer token not found');
//     }
  
//     const token = authHeader.substring(7);
//     req.token = token; // Attach the token to the request object for further processing
//     next();
//   }
// }

import { Injectable, NestInterceptor, ExecutionContext, CallHandler, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

declare global {
    namespace Express {
      interface Request {
        token?: any;
      }
    }
  }

@Injectable()
export class JwtInterceptor implements NestInterceptor {
  constructor(private readonly jwtService: JwtService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Bearer token not found');
    }
  
    const token = authHeader.substring(7);
    try {
      const decodedToken = this.jwtService.verify(token); 
      request.token = decodedToken;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }

    return next.handle();
  }
}

