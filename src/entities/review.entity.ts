import {
  Column,
  Entity,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
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

  @OneToOne(() => User, (user) => user.review)
  user_id: User;

  @Column('varchar')
  rating: number;

  @Column({ type: 'timestamp', update: true })
  update_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_at: Date;
}
