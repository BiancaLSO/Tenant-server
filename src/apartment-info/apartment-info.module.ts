import { Module } from '@nestjs/common';
import { ApartmentInfoService } from './apartment-info.service';
import { ApartmentInfoController } from './apartment-info.controller';

@Module({
  controllers: [ApartmentInfoController],
  providers: [ApartmentInfoService]
})
export class ApartmentInfoModule {}
