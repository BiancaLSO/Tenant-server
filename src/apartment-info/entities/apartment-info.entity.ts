import { Region } from 'src/regions/entities/region.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class ApartmentInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  street: string;

  @Column()
  floor: number;

  @Column()
  apartment: number;

  @Column()
  allowPets: boolean;

  @Column()
  extraDetails: string;

  // Relation linking the apartment-info with regions
}
