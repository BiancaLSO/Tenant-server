import { Module } from '@nestjs/common';
import { InfosService } from './infos.service';
import { InfosController } from './infos.controller';
import { Info } from './entities/info.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Info])],
  controllers: [InfosController],
  providers: [InfosService],
})
export class InfosModule {}
