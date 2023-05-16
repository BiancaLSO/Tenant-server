import { Injectable } from '@nestjs/common';
import { CreateApartmentInfoDto } from './dto/create-apartment-info.dto';
import { UpdateApartmentInfoDto } from './dto/update-apartment-info.dto';
import { ApartmentInfo } from './entities/apartment-info.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ApartmentInfoService {
  constructor(
    @InjectRepository(ApartmentInfo)
    private apartmentInfoRepository: Repository<ApartmentInfo>,
  ) {}

  // do not think we need it implemented on frontend, we will put some apartment info in the database with it and that's it
  async create(
    createApartmentInfoDto: CreateApartmentInfoDto,
  ): Promise<ApartmentInfo> {
    return this.apartmentInfoRepository.save(createApartmentInfoDto);
  }

  // findAll() {
  //   return `This action returns all apartmentInfo`;
  // }

  // not sure where we would use this either
  async findOne(id: number): Promise<ApartmentInfo> {
    const apartmentInfo = await this.apartmentInfoRepository.findOneBy({
      id: id,
    });
    if (!apartmentInfo) {
      throw new Error(`ApartmentInfo with id ${id} not found`);
    }
    return apartmentInfo;
  }

  async remove(id: number): Promise<ApartmentInfo> {
    const apartmentInfoToRemove = await this.apartmentInfoRepository.findOneBy({
      id: id,
    });
    if (!apartmentInfoToRemove) {
      throw new Error(`ApartmentInfo with id ${id} not found`);
    }
    await this.apartmentInfoRepository.delete(apartmentInfoToRemove.id);
    return apartmentInfoToRemove;
  }
}
