import { Test, TestingModule } from '@nestjs/testing';
import { InfosController } from './infos.controller';
import { InfosService } from './infos.service';

describe('InfosController', () => {
  let controller: InfosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InfosController],
      providers: [InfosService],
    }).compile();

    controller = module.get<InfosController>(InfosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
