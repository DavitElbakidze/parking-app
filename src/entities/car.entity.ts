import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('varchar')
  mark: string;
  @Column('varchar')
  model: string;
  @Column('varchar')
  type: string;
  @Column('int')
  year: number;
  @Column('varchar', { unique: true })
  numberPlate: string;
  @Column('varchar')
  color: string;
  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
