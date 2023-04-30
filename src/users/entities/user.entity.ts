import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Role } from '../roles/role.enum';
import { TenantEntity } from './tenant.entity';
import { BoardMemberEntity } from './boardmember.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phone: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  // Link with apartment id
  // Link to issues created

  // Link with Tenant, Admin and SuperAdmin for Role Based Auth
  @OneToOne((type) => TenantEntity, (tenant) => tenant.user)
  tenant: TenantEntity | null;

  @OneToOne((type) => BoardMemberEntity, (board) => board.user)
  board: BoardMemberEntity | null;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role;
}
