import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Car } from './car.entity';
import { PasswordReset } from './password-reset.entity';

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  firstName: string;

  @Column('varchar')
  lastName: string;

  @Column('varchar', { length: 11, unique: true })
  IDNumber: string;

  @Column('varchar')
  phone: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  roles: Role;

  @Column('varchar')
  password: string;

  @Column('varchar', { unique: true })
  email: string;

  @Column('int', { default: 100 })
  balance: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createDate: Date;

  @OneToMany(() => Car, (car) => car.user)
  cars: Car[];

  @OneToMany(() => PasswordReset, (passwordReset) => passwordReset.user)
  passwordReset: PasswordReset[];
}
