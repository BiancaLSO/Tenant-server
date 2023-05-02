import { Injectable } from '@nestjs/common';
import { CreateInfoDto } from './dto/create-info.dto';
import { UpdateInfoDto } from './dto/update-info.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Info } from './entities/info.entity';
@Injectable()
export class InfosService {
  constructor(
    @InjectRepository(Info)
    private infoRepository: Repository<Info>,
  ) {}

  async create(createInfoDto: CreateInfoDto): Promise<Info> {
    const info = new Info();
    info.title = createInfoDto.title;
    info.info = createInfoDto.info;
    return await this.infoRepository.save(info);
  }

  async findAll() {
    return await this.infoRepository.find();
  }

  async remove(id: number): Promise<Info> {
    const infoToRemove = await this.infoRepository.findOne({
      where: { id: id },
    });
    if (!infoToRemove) {
      throw new Error(`Info with id ${id} not found`);
    }
    return await this.infoRepository.remove(infoToRemove);
  }
}
