import { Injectable } from '@nestjs/common';
import { Region } from './entities/region.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RegionsService {
  constructor(@InjectRepository(Region) 
  private regionRepository: Repository<Region>)
  {}

  findAll() {
    return this.regionRepository.find()
  }

  findOne(id: number) {
    return this.regionRepository.findOneBy({id: id})
  }
}
