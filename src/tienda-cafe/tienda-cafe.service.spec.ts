import { Test, TestingModule } from '@nestjs/testing';
import { TiendaCafeService } from './tienda-cafe.service';

describe('TiendaCafeService', () => {
  let service: TiendaCafeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TiendaCafeService],
    }).compile();

    service = module.get<TiendaCafeService>(TiendaCafeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
