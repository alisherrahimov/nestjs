import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Book } from './book.entity';
import { User } from './user.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  message: string;

  @ManyToMany(() => Book, (book) => book.review)
  book: Book;

  @ManyToOne(() => User, (user) => user.review)
  user: User;

  @Column({ type: 'float' })
  rating: number;

  @UpdateDateColumn()
  updateAt: Date;

  @CreateDateColumn()
  createAt: Date;
}
