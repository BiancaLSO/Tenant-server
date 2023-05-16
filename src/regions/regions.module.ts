import { Module } from '@nestjs/common';
import { RegionsService } from './regions.service';
import { RegionsController } from './regions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/authentication/auth.module';
import { Region } from './entities/region.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Region]), AuthModule],
  controllers: [RegionsController],
  providers: [RegionsService]
})
export class RegionsModule {}
