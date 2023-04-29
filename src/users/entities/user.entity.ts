import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

  // Link with Tenant, Admin and SuperAdmin for Role Based Auth
}
