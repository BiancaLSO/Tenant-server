import { ApartmentInfo } from 'src/apartment-info/entities/apartment-info.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Region {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  postcode: number;

  // Relation linking the regions with apartment-info
}
