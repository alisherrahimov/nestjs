import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Book } from './book.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, type: 'varchar' })
  name: string;

  @Column('varchar')
  image: string;

  @ManyToOne(() => Book, (book) => book.category)
  book: Book;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createAt: Date;
}
