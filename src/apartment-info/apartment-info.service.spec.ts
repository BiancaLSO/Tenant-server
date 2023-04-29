import { Test, TestingModule } from '@nestjs/testing';
import { ApartmentInfoService } from './apartment-info.service';

describe('ApartmentInfoService', () => {
  let service: ApartmentInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApartmentInfoService],
    }).compile();

    service = module.get<ApartmentInfoService>(ApartmentInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
