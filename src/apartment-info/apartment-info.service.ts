import { Injectable } from '@nestjs/common';
import { CreateApartmentInfoDto } from './dto/create-apartment-info.dto';
import { ApartmentInfo } from './entities/apartment-info.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ApartmentInfoService {
  constructor(
    @InjectRepository(ApartmentInfo)
    private apartmentInfoRepository: Repository<ApartmentInfo>,
  ) {}

  async create(
    createApartmentInfoDto: CreateApartmentInfoDto,
  ): Promise<ApartmentInfo> {
    return this.apartmentInfoRepository.save(createApartmentInfoDto);
  }

  async findAll() {
    return this.apartmentInfoRepository.find();
  }

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
