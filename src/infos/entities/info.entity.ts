import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Info {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  info: string;
}
