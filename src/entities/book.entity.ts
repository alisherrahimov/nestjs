import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { Fovarite } from './fovarite.entity';
import { Review } from './review.entity';
import { ApiProperty } from '@nestjs/swagger';
@Entity()
export class Book {
  @ApiProperty({ title: 'id', description: 'id of book' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ title: 'title', description: 'title of book' })
  @Column({ type: 'text' })
  book_name: string;

  @Column({ type: 'text' })
  image: string;

  @Column({ type: 'text' })
  author: string;

  @Column({ type: 'integer' })
  down_count: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'integer' })
  page: number;

  @Column({ type: 'text' })
  download_link: string;

  @Column({ type: 'text' })
  audio_link: string;

  @Column({ type: 'text' })
  audio_duration: string;

  @Column({ enum: ['free', 'paid'], default: 'free' })
  type: string;

  @OneToMany(() => Category, (category) => category.book, { nullable: true })
  category: Category[];

  @OneToMany(() => Review, (review) => review.book, { nullable: true })
  review: Review[];

  @ManyToOne(() => Fovarite, (fovarite) => fovarite.book, { nullable: true })
  fovarite: Fovarite;

  @UpdateDateColumn()
  updateAt: Date;

  @CreateDateColumn()
  createAt: Date;
}
