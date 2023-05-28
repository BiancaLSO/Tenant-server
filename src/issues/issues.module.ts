import { Module } from '@nestjs/common';
import { IssuesService } from './issues.service';
import { IssuesController } from './issues.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Issue } from './entities/issue.entity';
import { AuthGuard } from '@nestjs/passport';
import { AuthModule } from '../../src/authentication/auth.module';
import { UsersModule } from '../../src/users/users.module';
import { Category } from '../../src/categories/entities/category.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([Issue, Category]),
    AuthModule,
    UsersModule,
    HttpModule,
  ],
  controllers: [IssuesController],
  providers: [IssuesService],
})
export class IssuesModule {}
