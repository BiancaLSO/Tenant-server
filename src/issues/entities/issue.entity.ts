import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Issue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  subject: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  imageUrl: string;

  //  Here it has to be connect with the tenat in order to to know who created which issue

  //   @ManyToOne(() => Tenant, (tenant) => tenant.problem)
  //   tenant: Tenant;
}
