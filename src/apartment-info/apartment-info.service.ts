import { Injectable } from '@nestjs/common';
import { CreateApartmentInfoDto } from './dto/create-apartment-info.dto';
import { UpdateApartmentInfoDto } from './dto/update-apartment-info.dto';

@Injectable()
export class ApartmentInfoService {
  create(createApartmentInfoDto: CreateApartmentInfoDto) {
    return 'This action adds a new apartmentInfo';
  }

  findAll() {
    return `This action returns all apartmentInfo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} apartmentInfo`;
  }

  update(id: number, updateApartmentInfoDto: UpdateApartmentInfoDto) {
    return `This action updates a #${id} apartmentInfo`;
  }

  remove(id: number) {
    return `This action removes a #${id} apartmentInfo`;
  }
}
