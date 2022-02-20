import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { Fovarite } from './fovarite.entity';
import { Review } from './review.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, type: 'varchar' })
  book_name: string;

  @Column('varchar')
  image: string;

  @Column('varchar')
  author: string;

  @Column({ type: 'integer' })
  down_count: number;

  @Column()
  description: string;

  @Column('varchar')
  price: number;

  @Column('integer')
  page: number;

  @Column('varchar')
  download_link: string;

  @Column()
  audio_link: string;

  @Column('integer')
  audio_duration: string;

  @Column({ enum: ['free', 'paid'], default: 'free' })
  type: string;

  @OneToMany(() => Category, (category) => category.id, { nullable: false })
  category: Category[];

  @OneToMany(() => Review, (review) => review.book, { nullable: true })
  review: Review[];

  @ManyToOne(() => Fovarite, (fovarite) => fovarite.book, { nullable: true })
  fovarite: Fovarite;

  @Column({ type: 'timestamp', update: true })
  update_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_at: Date;
}
