/* eslint-disable prettier/prettier */
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/auth/public';
import { ROLES_KEY } from 'src/decoretors/role';
import { admin_access, user_access } from 'src/users/access';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }
    const endpoint = this.reflector.getAllAndOverride<string>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const { user } = context.switchToHttp().getRequest();
    const role = user.role;
    if (role == 'admin') {
      return admin_access.includes(endpoint);
    }
    return user_access.includes(endpoint);

    //   if (role == 'admin') {
    //     const check = admin_access.includes(endpoint);
    //     if (check) {
    //       return check;
    //     }
    //     return {
    //       status: 0,
    //       data: null,
    //       msg: 'Unauthorized access for user of type admin',
    //     };
    //   }
    //   const check = user_access.includes(endpoint);
    //   if (check) {
    //     return check;
    //   }
    //   return {
    //     status: 0,
    //     data: null,
    //     msg: 'Unauthorized access for user of type user',
    //   };
  }
}
