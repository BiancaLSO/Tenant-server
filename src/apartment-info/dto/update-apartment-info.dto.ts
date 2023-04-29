import { PartialType } from '@nestjs/mapped-types';
import { CreateApartmentInfoDto } from './create-apartment-info.dto';

export class UpdateApartmentInfoDto extends PartialType(CreateApartmentInfoDto) {}
