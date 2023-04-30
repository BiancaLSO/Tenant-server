import { Body, Controller, Post, Request as Request2, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LocalAuthGuard } from './local-auth.guard';

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

  // login
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request2() req) {
    return this.authService.login(req.user);
  }
}
