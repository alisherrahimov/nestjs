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

  @Column({ type: 'date' })
  born_date: Date;

  @Column('varchar')
  location: string;

  @Column('varchar', {
    nullable: true,
    default:
      'https://png.pngtree.com/png-clipart/20190924/original/pngtree-user-vector-avatar-png-image_4830521.jpg',
  })
  avatar: string;

  //   @Column('varchar')
  //   history: string;

  @OneToOne(() => Fovarite, (fovarite) => fovarite.id, {
    nullable: true,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  fovarite: Fovarite[];

  @OneToOne(() => Review, (review) => review.user_id, {
    nullable: true,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  review: Review[];

  @Column({ enum: ['male', 'female'], type: 'varchar' })
  gender: string;

  @Column({ type: 'varchar', default: 0, nullable: true })
  amount: number;

  @Column({ type: 'time with time zone', nullable: true, update: true })
  update_at?: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', type: 'timestamp' })
  create_at?: Date;
}
