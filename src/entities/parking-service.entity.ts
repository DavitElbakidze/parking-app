import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Car } from './car.entity';
import { ParkingArea } from './parking-area.entyty';

export enum ParkingStatusEnum {
  inProgress = 'IN_PROGRESS',
  finished = 'FINISHED',
}

@Entity()
export class ParkingService {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  startTime: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  endTime: Date;

  @Column({
    type: 'enum',
    enum: ParkingStatusEnum,
    default: ParkingStatusEnum.inProgress,
  })
  parkingStatus: ParkingStatusEnum;

  @ManyToOne(() => User, { eager: true })
  user: User;

  @ManyToOne(() => Car, { eager: true })
  car: Car;

  @ManyToOne(() => ParkingArea, { eager: true })
  parkingArea: ParkingArea;
}
