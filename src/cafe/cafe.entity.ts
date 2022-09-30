import { TiendaEntity } from '../tienda/tienda.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class CafeEntity {
 @PrimaryGeneratedColumn('uuid')
 id: number;

 @Column()
 name: string;
 
 @Column()
 description: string;
 
 @Column()
 price: number;
 
 @ManyToMany(() => TiendaEntity, tienda => tienda.cafes)
 tiendas: TiendaEntity[];
}
