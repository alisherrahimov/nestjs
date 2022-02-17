import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Fovarite } from './fovarite.entity';
import { Review } from './review.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, type: 'varchar' })
  name: string;

  @Column('varchar', { unique: true })
  email: string;

  @Column('varchar')
  password: string;

  @Column({ enum: ['user', 'admin'], default: 'user' })
  role: string;

  @Column({ type: 'timestamp' })
  born_date: Date;

  @Column('varchar')
  location: string;

  @Column('varchar')
  avatar: string;

  //   @Column('varchar')
  //   history: string;

  @OneToOne(() => Fovarite, (fovarite) => fovarite.id)
  fovarite: Fovarite[];

  @OneToOne(() => Review, (review) => review.user_id)
  review: Review[];

  @Column({ enum: ['male', 'female'], type: 'varchar' })
  gender: string;

  @Column({ type: 'double', default: 0, nullable: true })
  amount: number;

  @Column({ type: 'time with time zone', update: true })
  update_at: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', type: 'time with time zone' })
  create_at: Date;
}
