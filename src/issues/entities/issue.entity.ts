import { IsOptional } from 'class-validator';
import { Category } from 'src/categories/entities/category.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Issue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  subject: string;

  @Column()
  description: string;

  @IsOptional()
  @Column({ nullable: true })
  imageUrl?: string;

  @ManyToOne(() => Category, (category) => category.issues)
  category: Category;

  @ManyToOne(() => User, (user) => user.issues)
  user: User;
}
