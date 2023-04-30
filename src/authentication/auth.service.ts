import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,
    private jwtService: JwtService
    ) {}

  async signupTenant(createUserDto: CreateUserDto) {
    return this.usersService.createTenant(createUserDto);
  }
  async signupBoardMember(createUserDto: CreateUserDto) {
    return this.usersService.createBoardMember(createUserDto);
  }

  async validateUser(username: string, pass: any): Promise<any> {
    const user = await this.usersService.findOne(username);
    console.log('user found', user);

    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    let payload: any = {
      username: user.email,
      id: user.id,
      // tenantId: user.tenant?.id
    };
    
    if (user.tenant) {
      payload.tenantId = user.tenant.id;
    } else if (user.board) {
      payload.boardId = user.board.id;
    }

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
