import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Suggestion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
