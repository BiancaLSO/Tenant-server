import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { Category } from '../../src/categories/entities/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IssuesModule } from '../../src/issues/issues.module';
import { Issue } from '../../src/issues/entities/issue.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Issue]), IssuesModule],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
