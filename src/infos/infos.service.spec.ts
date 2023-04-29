import { Test, TestingModule } from '@nestjs/testing';
import { InfosService } from './infos.service';

describe('InfosService', () => {
  let service: InfosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InfosService],
    }).compile();

    service = module.get<InfosService>(InfosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
