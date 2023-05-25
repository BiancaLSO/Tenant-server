import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { comparePasswords } from 'utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signupTenant(createUserDto: CreateUserDto, apartmentInfoId?: number) {
    return this.usersService.createTenant(createUserDto, apartmentInfoId);
  }

  async signupBoardMember(
    createUserDto: CreateUserDto,
    apartmentInfoId?: number,
  ) {
    return this.usersService.createBoardMember(createUserDto, apartmentInfoId);
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    console.log('user found', user);

    if (user) {
      const matched = comparePasswords(pass, user.password);
      if (matched) {
        return user;
      } else {
        console.log("Passwords don't match");
        return null;
      }
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
      id: payload.id,
      access_token: this.jwtService.sign(payload),
    };
  }
}
