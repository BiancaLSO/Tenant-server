import { Injectable } from '@nestjs/common';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { Issue } from './entities/issue.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
export class IssuesService {
  constructor(
    @InjectRepository(Issue)
    private issueRepository: Repository<Issue>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  create(createIssueDto: CreateIssueDto) {
    // fIND category based on id
    //find userId based on id in Secure Storage
    // add category.Id when creating an issue
    // add userId when creating an issue
    return this.issueRepository.save(createIssueDto);
  }

  findAll() {
    return this.issueRepository.find();
  }

  findOne(id: number) {
    return this.issueRepository.findOneBy({ id: id });
  }

  remove(id: number) {
    return this.issueRepository.delete({ id: id });
  }
}
