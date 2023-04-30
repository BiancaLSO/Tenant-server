import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common'
import { Role } from 'src/users/roles/role.enum';
import { UsersService } from '../users.service'

//Used with JWT guard to allow only admin access to endpoint.
@Injectable()
export class TenantGuard implements CanActivate {
  constructor(@Inject(UsersService) private usersService: UsersService) {}
  
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const userId: number = request.user.id
    const user = await this.usersService.findUserById(userId);
  
    return user && user.role === Role.User
  }
}