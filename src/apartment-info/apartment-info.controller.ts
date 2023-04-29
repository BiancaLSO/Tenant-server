import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApartmentInfoService } from './apartment-info.service';
import { CreateApartmentInfoDto } from './dto/create-apartment-info.dto';
import { UpdateApartmentInfoDto } from './dto/update-apartment-info.dto';

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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateApartmentInfoDto: UpdateApartmentInfoDto) {
    return this.apartmentInfoService.update(+id, updateApartmentInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.apartmentInfoService.remove(+id);
  }
}
