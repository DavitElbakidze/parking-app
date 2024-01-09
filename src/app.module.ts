import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Car } from './entities/car.entity';
import { UsersModule } from './modules/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './modules/auth/auth.module';
import { AuthService } from './modules/auth/auth.service';
import { JwtStrategy } from './modules/auth/jwt.strategy';
import { CarsModule } from './modules/cars/cars.module';
import { ParkingArea } from './entities/parking-area.entyty';
import { ParkingAreaModule } from './modules/parking-area/parking-area.module';
import { ParkingService } from './entities/parking-service.entity';
import { ParkingServiceModule } from './modules/parking-service/parking-service.module';
import { PasswordReset } from './entities/password-reset.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Kvazimodo123',
      database: 'parking-app',
      entities: [User, Car, ParkingArea, ParkingService, PasswordReset],
      synchronize: true,
    }),
    JwtModule.register({
      secret: 'jwtConstants.secret',
      signOptions: { expiresIn: '1h' },
    }),
    ParkingServiceModule,
    ParkingAreaModule,
    PassportModule,
    AuthModule,
    UsersModule,
    CarsModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, JwtStrategy],
})
export class AppModule {}
