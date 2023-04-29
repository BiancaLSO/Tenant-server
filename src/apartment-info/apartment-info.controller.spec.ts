import { Test, TestingModule } from '@nestjs/testing';
import { ApartmentInfoController } from './apartment-info.controller';
import { ApartmentInfoService } from './apartment-info.service';

describe('ApartmentInfoController', () => {
  let controller: ApartmentInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApartmentInfoController],
      providers: [ApartmentInfoService],
    }).compile();

    controller = module.get<ApartmentInfoController>(ApartmentInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
