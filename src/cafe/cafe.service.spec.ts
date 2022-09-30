import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { CafeEntity } from './cafe.entity';
import { CafeService } from './cafe.service';


import { faker } from '@faker-js/faker';


describe('CafeService', () => {
  let service: CafeService;
  let repository: Repository<CafeEntity>;
  let cafesList: CafeEntity[];


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [CafeService],
    }).compile();


    service = module.get<CafeService>(CafeService);
    repository = module.get<Repository<CafeEntity>>(getRepositoryToken(CafeEntity));
    await seedDatabase();
  });


  const seedDatabase = async () => {
    repository.clear();
    cafesList = [];
    for (let i = 0; i < 5; i++) {


      const cafe: CafeEntity = await repository.save({
        name: faker.company.name(),
        description: faker.lorem.sentence(),
        price: faker.datatype.number()

      })
    }}

    it('should be defined', () => {
      expect(service).toBeDefined();
    });




    it('create should return a new cafe', async () => {
      const cafe: CafeEntity = {
        id: 0,
        name: faker.company.name(),
        description: faker.lorem.sentence(),
        price: 10,
        tiendas: []
      }


      const newCafe: CafeEntity = await service.create(cafe);
      expect(newCafe).not.toBeNull();


      const storedCafe: CafeEntity = await repository.findOne({ where: { id: newCafe.id } })
      expect(storedCafe).not.toBeNull();
      expect(storedCafe.name).toEqual(newCafe.name)
      expect(storedCafe.description).toEqual(newCafe.description)
      expect(storedCafe.price).toEqual(newCafe.price)

    });

  });

