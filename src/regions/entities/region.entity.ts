import { ApartmentInfo } from 'src/apartment-info/entities/apartment-info.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Region {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  postcode: number;

  // @OneToMany(() => ApartmentInfo, (apartment) => apartment.region)
  // apartments: ApartmentInfo[];
}
