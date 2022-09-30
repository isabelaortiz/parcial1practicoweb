import { Test, TestingModule } from '@nestjs/testing';
	import { CafeEntity } from '../cafe/cafe.entity';
	import { Repository } from 'typeorm';
	import { TiendaEntity } from '../tienda/tienda.entity';
	import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
	import { TiendaCafeService } from './tienda-cafe.service';
	import { getRepositoryToken } from '@nestjs/typeorm';
	import { faker } from '@faker-js/faker';
	

	describe('TiendaCafeService', () => {
	  let service: TiendaCafeService;
	  let tiendaRepository: Repository<TiendaEntity>;
	  let cafeRepository: Repository<CafeEntity>;
	  let tienda: TiendaEntity;
	  let cafesList : CafeEntity[];
	

	  beforeEach(async () => {
	    const module: TestingModule = await Test.createTestingModule({
	      imports: [...TypeOrmTestingConfig()],
	      providers: [TiendaCafeService],
	    }).compile();
	

	    service = module.get<TiendaCafeService>(TiendaCafeService);
	    tiendaRepository = module.get<Repository<TiendaEntity>>(getRepositoryToken(TiendaEntity));
	    cafeRepository = module.get<Repository<CafeEntity>>(getRepositoryToken(CafeEntity));
	

	    await seedDatabase();
	  });
	

	  const seedDatabase = async () => {
	    cafeRepository.clear();
	    tiendaRepository.clear();
	

	    cafesList = [];
	    for(let i = 0; i < 5; i++){
	        const cafe: CafeEntity = await cafeRepository.save({
            name: faker.company.name(),
            description: faker.lorem.sentence(),
            price: faker.datatype.number()
	        })
	        cafesList.push(cafe);
	    }
	

	    tienda = await tiendaRepository.save({
        name: faker.company.name(),
        address: faker.lorem.sentence(),
        telefone: faker.random.numeric(10),
	      cafes: cafesList
	    })
	  }
	

	  it('should be defined', () => {
	    expect(service).toBeDefined();
	  });
	

	  it('addCafeTienda should add an cafe to a tienda', async () => {
	    const newCafe: CafeEntity = await cafeRepository.save({
	      name: faker.company.name(),
            description: faker.lorem.sentence(),
            price: faker.datatype.number()
	    });
	

	    const newTienda: TiendaEntity = await tiendaRepository.save({
	      name: faker.company.name(),
        address: faker.lorem.sentence(),
        telefone: faker.random.numeric(10),
	    })
	

	    const result: TiendaEntity = await service.addCafeToTienda(newTienda.id, newCafe.id);
	    
	    expect(result.cafes.length).toBe(1);
	    expect(result.cafes[0]).not.toBeNull();
	    expect(result.cafes[0].name).toBe(newCafe.name)
	    expect(result.cafes[0].description).toBe(newCafe.description)
	    expect(result.cafes[0].price).toBe(newCafe.price)
	   
	  });
  });
	

