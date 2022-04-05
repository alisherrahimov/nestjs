import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Fovarite } from './fovarite.entity';
import { Review } from './review.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ unique: true, type: 'text' })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ enum: ['user', 'admin'], default: 'user' })
  role: string;

  @Column({ type: 'date' })
  born_date: Date;

  @Column({ type: 'text' })
  location: string;

  @Column({
    nullable: true,
    type: 'text',
    default:
      'https://png.pngtree.com/png-clipart/20190924/original/pngtree-user-vector-avatar-png-image_4830521.jpg',
  })
  avatar: string;

  @OneToMany(() => Fovarite, (fovarite) => fovarite.user, {
    nullable: true,
  })
  fovarite: Fovarite[];

  @OneToMany(() => Review, (review) => review.user, {
    nullable: true,
  })
  review: Review[];

  @Column({ type: 'json', nullable: true })
  interesting: string[];

  @Column({ enum: ['male', 'female'], type: 'text' })
  gender: string;

  @Column({ type: 'text', default: 0, nullable: true })
  amount: number;

  @CreateDateColumn()
  updateAt: Date;

  @CreateDateColumn()
  createAt: Date;
}
