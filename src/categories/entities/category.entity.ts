import { Issue } from '../../../src/issues/entities/issue.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Issue, (issue) => issue.category)
  issues: Issue[];
}
