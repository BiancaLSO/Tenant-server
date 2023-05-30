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
  Req,
} from '@nestjs/common';
import { IssuesService } from './issues.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { Issue } from './entities/issue.entity';
import { AdminGuard } from 'src/users/roles/admin.guard';
import { JwtAuthGuard } from 'src/authentication/jwt-auth.guard';

@Controller('issues')
export class IssuesController {
  constructor(private readonly issuesService: IssuesService) {}

  @Post()
  async create(@Req() req, @Body() body) {
    // console.log('body:', body);

    const userId = body.data.userId;
    const categoryId = body.data.categoryId;

    console.log('userId from controler', userId);
    console.log('categoryId from controller', categoryId);

    // Save the image if provided
    let display_url: string | undefined;
    if (body.data.imageUrl && body.data.imageUrl.base64) {
      display_url = await this.issuesService.saveImage(
        body.data.imageUrl.base64,
      );
      console.log('image url', display_url);
    }

    let createIssueDto;
    if (display_url) {
      createIssueDto = new CreateIssueDto(
        body.data.subject,
        body.data.description,
        display_url,
      );
    } else {
      createIssueDto = new CreateIssueDto(
        body.data.subject,
        body.data.description,
      );
    }
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

  @UseGuards(JwtAuthGuard, AdminGuard)
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
