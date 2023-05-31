import { User } from '../../../src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';

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
  region: string;

  @Column()
  allowPets: boolean;

  @Column()
  extraDetails: string;

  @OneToMany((type) => User, (user) => user.apartmentInfo)
  users: User[];
}
