import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { IssuesService } from './issues.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { TenantGuard } from 'src/users/roles/tenant.guard';
import { JwtAuthGuard } from 'src/authentication/jwt-auth.guard';
import { Issue } from './entities/issue.entity';

@Controller('issues')
export class IssuesController {
  constructor(private readonly issuesService: IssuesService) {}

  @Post()
  create(
    @Body() createIssueDto: CreateIssueDto,
    categoryId: number,
    userId: number,
  ) {
    return this.issuesService.create(createIssueDto, categoryId, userId);
  }

  // @UseGuards(JwtAuthGuard, TenantGuard) // testing
  @Get()
  findAll() {
    return this.issuesService.findAll();
  }
  @Get('/search')
  async searchIssuesBySubject(
    @Query('subject') subject: string,
  ): Promise<Issue[]> {
    return this.issuesService.searchIssuesBySubject(subject);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.issuesService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    console.log(id);
    return this.issuesService.remove(+id);
  }

  @Get('filter/filters')
  async filter(@Query('category') categoryName: string) {
    console.log(categoryName);
    return await this.issuesService.filter(categoryName);
  }
  @Get('user/issues/userissues')
  findAllByUser(@Query('userId') userId: number) {
    return this.issuesService.findAllByUserId(userId);
  }
}
