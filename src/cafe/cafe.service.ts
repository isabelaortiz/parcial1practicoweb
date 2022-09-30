import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { CafeEntity } from './cafe.entity';

@Injectable()
export class CafeService {
   constructor(
       @InjectRepository(CafeEntity)
       private readonly cafeRepository: Repository<CafeEntity>
   ){}

   async create(cafe: CafeEntity): Promise<CafeEntity> {
    if (cafe.price <= 0)
            throw new BusinessLogicException("The price is not a positive number", BusinessError.BAD_REQUEST)
        
    return await this.cafeRepository.save(cafe);
   }
}