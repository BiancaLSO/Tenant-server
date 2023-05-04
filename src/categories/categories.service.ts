import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { Issue } from 'src/issues/entities/issue.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Issue)
    private issueRepository: Repository<Issue>,
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryRepository.save(createCategoryDto);
  }

  findAll() {
    return this.categoryRepository.find();
  }

  findOne(id: number) {
    return this.categoryRepository.findOneBy({ id: id });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    this.categoryRepository.update({ id }, { ...updateCategoryDto });
    const updateCategory = this.categoryRepository.findOneBy({ id: id });
    return updateCategory;
  }

  remove(id: number) {
    return this.categoryRepository.delete({ id: id });
  }

  // filter(categoryName: string) {
  //   const query = this.issueRepository
  //     .createQueryBuilder('issue')
  //     .innerJoin('issue.category', 'category')
  //     .where('category.name =:categoryName', { categoryName })
  //     .getMany();

  //   return query;
  // }
}
