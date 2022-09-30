import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { TiendaEntity } from './tienda.entity';
import { TiendaService } from './tienda.service';


import { faker } from '@faker-js/faker';


describe('TiendaService', () => {
  let service: TiendaService;
  let repository: Repository<TiendaEntity>;
  let tiendasList: TiendaEntity[];


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [TiendaService],
    }).compile();


    service = module.get<TiendaService>(TiendaService);
    repository = module.get<Repository<TiendaEntity>>(getRepositoryToken(TiendaEntity));
    await seedDatabase();
  });


  const seedDatabase = async () => {
    repository.clear();
    tiendasList = [];
    for (let i = 0; i < 5; i++) {


      const tienda: TiendaEntity = await repository.save({
        name: faker.company.name(),
        address: faker.lorem.sentence(),
        telefone: faker.random.numeric(10)

      })
    }}

    it('should be defined', () => {
      expect(service).toBeDefined();
    });




    it('create should return a new tienda', async () => {
      const tienda: TiendaEntity = {
        id: 0,
        name: faker.company.name(),
        address: faker.lorem.sentence(),
        telefone: faker.random.numeric(10),
        cafes: []
      }


      const newTienda: TiendaEntity = await service.create(tienda);
      expect(newTienda).not.toBeNull();


      const storedTienda: TiendaEntity = await repository.findOne({ where: { id: newTienda.id } })
      expect(storedTienda).not.toBeNull();
      expect(storedTienda.name).toEqual(newTienda.name)
      expect(storedTienda.address).toEqual(newTienda.address)
      expect(storedTienda.telefone).toEqual(newTienda.telefone)

    });

    it('create should through a business error', async () => {
        const tienda: TiendaEntity = {
        id: 0,
        name: faker.company.name(),
        address: faker.lorem.sentence(),
        telefone: faker.random.numeric(2),
        cafes: []
      }

      await expect(() => service.create(tienda)).rejects.toHaveProperty("message", "The telefone does not have a length of 10")
      

    });

  });
