import { Injectable } from '@nestjs/common';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { Issue } from './entities/issue.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class IssuesService {
  constructor(@InjectRepository(Issue) 
  private issueRepository: Repository<Issue>)
 {}

  create(createIssueDto: CreateIssueDto) {
    return this.issueRepository.save(createIssueDto)
  }

  findAll() {
  return this.issueRepository.find()
  }

  findOne(id: number) {
  return this.issueRepository.findOneBy({id: id})
  }

  remove(id: number) {
    return this.issueRepository.delete({id: id});
  }

}
