import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Book } from './book.entity';
import { User } from './user.entity';

@Entity()
export class Fovarite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => User, (user) => user.fovarite, { nullable: true })
  user: User;

  @OneToMany(() => Book, (book) => book.fovarite, { nullable: true })
  book: Book[];

  @UpdateDateColumn()
  updateAt: Date;

  @CreateDateColumn()
  createAt: Date;
}
