import { Injectable } from '@nestjs/common';
import { CreateInfoDto } from './dto/create-info.dto';
import { UpdateInfoDto } from './dto/update-info.dto';

@Injectable()
export class InfosService {
  create(createInfoDto: CreateInfoDto) {
    return 'This action adds a new info';
  }

  findAll() {
    return `This action returns all infos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} info`;
  }

  update(id: number, updateInfoDto: UpdateInfoDto) {
    return `This action updates a #${id} info`;
  }

  remove(id: number) {
    return `This action removes a #${id} info`;
  }
}
