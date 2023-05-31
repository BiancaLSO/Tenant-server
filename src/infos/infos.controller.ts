import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { InfosService } from './infos.service';
import { CreateInfoDto } from './dto/create-info.dto';

@Controller('infos')
export class InfosController {
  constructor(private readonly infosService: InfosService) {}

  @Post()
  create(@Body() createInfoDto: CreateInfoDto) {
    return this.infosService.create(createInfoDto);
  }

  @Get()
  findAll() {
    return this.infosService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.infosService.remove(+id);
  }
}
