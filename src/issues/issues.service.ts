import { Injectable } from '@nestjs/common';
import { CreateIssueDto } from './dto/create-issue.dto';
import { Issue } from './entities/issue.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class IssuesService {
  constructor(
    @InjectRepository(Issue)
    private issueRepository: Repository<Issue>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(
    createIssueDto: CreateIssueDto,
    categoryId: number,
    userId: number,
  ): Promise<Issue> {
    const category = await this.categoryRepository.findOneBy({
      id: categoryId,
    });
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!category || !user) {
      throw new Error('Category not found');
    }

    const issue = new Issue();
    issue.subject = createIssueDto.subject;
    issue.description = createIssueDto.description;
    issue.category = category;
    issue.user = user;

    return this.issueRepository.save(issue);
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

  async searchIssuesBySubject(subject: string): Promise<Issue[]> {
    return this.issueRepository.find({
      where: {
        subject: Like(`%${subject}%`),
      },
    });
  }

  async filter(categoryName: string): Promise<Issue[]> {
    const query = this.issueRepository
      .createQueryBuilder('issue')
      .innerJoinAndSelect('issue.category', 'category')
      .where('category.name = :categoryName', { categoryName });

    const issues = await query.getMany();

    return issues;
  }
}
