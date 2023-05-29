import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantEntity } from './entities/tenant.entity';
import { User } from './entities/user.entity';
import { BoardMemberEntity } from './entities/boardmember.entity';
import { AuthModule } from 'src/authentication/auth.module';
import { ApartmentInfo } from 'src/apartment-info/entities/apartment-info.entity';
import { SignupExceptionFilter } from './signup.exception-filter';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      TenantEntity,
      BoardMemberEntity,
      ApartmentInfo,
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [
    UsersService,
    TypeOrmModule.forFeature([
      User,
      TenantEntity,
      BoardMemberEntity,
      ApartmentInfo,
    ]),
  ],
})
export class UsersModule {}
