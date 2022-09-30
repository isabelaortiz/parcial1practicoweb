import { CafeEntity } from '../cafe/cafe.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TiendaEntity {
 @PrimaryGeneratedColumn('uuid')
 id: number;

 @Column()
 name: string;
 
 @Column()
 address: string;
 
 @Column()
 telefone: string;

 @ManyToMany(() => CafeEntity, cafe => cafe.tiendas)
 @JoinTable()
 cafes: CafeEntity[];
 
}

