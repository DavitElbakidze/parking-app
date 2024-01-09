import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
@Entity()
export class ParkingArea {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('varchar', { unique: true })
  name: string;
  @Column('int')
  price: number;
  @Column('varchar')
  address: string;
  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
