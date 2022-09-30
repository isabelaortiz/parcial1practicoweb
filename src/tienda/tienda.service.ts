import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { TiendaEntity } from './tienda.entity';

@Injectable()
export class TiendaService {
   constructor(
       @InjectRepository(TiendaEntity)
       private readonly tiendaRepository: Repository<TiendaEntity>
   ){}

   async create(tienda: TiendaEntity): Promise<TiendaEntity> {
    if (tienda.telefone.length != 10)
            throw new BusinessLogicException("The telefone does not have a length of 10", BusinessError.BAD_REQUEST)
        
    return await this.tiendaRepository.save(tienda);
   }
}