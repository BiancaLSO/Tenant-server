import { Body, Controller, Post, Request as Request2 } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signuptenant')
  async signupTenant(@Body() createUserDto: CreateUserDto) {
    return this.authService.signupTenant(createUserDto);
  }
  @Post('/signupboardmember')
  async signupBoardMember(@Body() createUserDto: CreateUserDto) {
    return this.authService.signupBoardMember(createUserDto);
  }
}
