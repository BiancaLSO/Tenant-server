import { Injectable } from '@nestjs/common';
import { CreateIssueDto } from './dto/create-issue.dto';
import { Issue } from './entities/issue.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Category } from '../../src/categories/entities/category.entity';
import { User } from '../../src/users/entities/user.entity';
import { catchError, firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import axios, { AxiosError } from 'axios';
import RNFetchBlob from 'react-native-fetch-blob';
import * as FormData from 'form-data';
import { base64StringToBlob } from 'blob-util';
@Injectable()
export class IssuesService {
  constructor(
    @InjectRepository(Issue)
    private issueRepository: Repository<Issue>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly httpService: HttpService,
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
    issue.imageUrl = createIssueDto.imegeUrl;
    issue.category = category;
    issue.user = user;

    return this.issueRepository.save(issue);
  }
  async base64ToBlob(base64EncodedImage: string): Promise<Buffer> {
    const base64Image = base64EncodedImage.split(';base64,').pop();
    const buffer = Buffer.from(base64Image, 'base64');
    return buffer;
  }
  async saveImage(base64EncodedImage: string): Promise<string> {
    const buffer = await this.base64ToBlob(base64EncodedImage);
    const formData = new FormData();
    formData.append('image', buffer, 'image.jpg');

    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${process.env.IMG_API_KEY}`,
      formData,
      {
        headers: formData.getHeaders(),
      },
    );
    console.log(response.data.data.display_url);
    const display_url = response.data.data.display_url;
    return display_url;
  }

  findAll() {
    return this.issueRepository.find();
  }

  findOne(id: number) {
    return this.issueRepository.findOneBy({ id: id });
  }

  findAllByUserId(userId: number): Promise<Issue[]> {
    return this.issueRepository.find({ where: { user: { id: userId } } });
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
