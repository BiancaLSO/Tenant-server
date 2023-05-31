import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ApartmentInfoService } from './apartment-info.service';
import { CreateApartmentInfoDto } from './dto/create-apartment-info.dto';

@Controller('apartment-info')
export class ApartmentInfoController {
  constructor(private readonly apartmentInfoService: ApartmentInfoService) {}

  @Post()
  create(@Body() createApartmentInfoDto: CreateApartmentInfoDto) {
    return this.apartmentInfoService.create(createApartmentInfoDto);
  }

  @Get()
  findAll() {
    return this.apartmentInfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.apartmentInfoService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.apartmentInfoService.remove(+id);
  }
}
