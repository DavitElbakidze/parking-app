import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class PasswordReset {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @Column('timestamp')
  expirationDate: Date;

  @ManyToOne(() => User, (user) => user.passwordReset)
  user: User;
}
