import { Region } from 'src/regions/entities/region.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';

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

  @OneToMany((type) => User, (user) => user.apartmentInfo)
  users: User[];

  @ManyToOne((type) => Region, (region) => region.apartments)
  region: Region;
}
