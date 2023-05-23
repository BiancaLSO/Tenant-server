import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Role } from '../roles/role.enum';
import { TenantEntity } from './tenant.entity';
import { BoardMemberEntity } from './boardmember.entity';
import { ApartmentInfo } from 'src/apartment-info/entities/apartment-info.entity';
import { Issue } from 'src/issues/entities/issue.entity';
import { IsEmail, IsNotEmpty } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsEmail()
  @Column()
  email: string;

  @IsNotEmpty()
  @Column()
  password: string;

  @IsNotEmpty()
  @Column()
  firstName: string;

  @IsNotEmpty()
  @Column()
  lastName: string;

  @Column()
  phone: string;

  // @Column()
  // startDate?: Date;

  // @Column()
  // endDate?: Date;

  // Link with apartment id
  // Link to issues created

  // Link with Tenant, Admin and SuperAdmin for Role Based Auth
  @OneToOne((type) => TenantEntity, (tenant) => tenant.user)
  tenant: TenantEntity | null;

  @OneToOne((type) => BoardMemberEntity, (board) => board.user)
  board: BoardMemberEntity | null;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role | null;

  @ManyToOne((type) => ApartmentInfo, (apartment) => apartment)
  apartmentInfo: ApartmentInfo;

  @OneToMany((type) => Issue, (issues) => issues)
  issues: Issue[];
}
