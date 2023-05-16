import { Module } from '@nestjs/common';
import { ApartmentInfoService } from './apartment-info.service';
import { ApartmentInfoController } from './apartment-info.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApartmentInfo } from './entities/apartment-info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ApartmentInfo])],

  controllers: [ApartmentInfoController],
  providers: [ApartmentInfoService],
})
export class ApartmentInfoModule {}
