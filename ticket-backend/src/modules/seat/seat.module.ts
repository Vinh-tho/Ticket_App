import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seat } from '../../entities/Seat';
import { SeatService } from './seat.service';
import { SeatController } from './seat.controller';
import { SeatStatusModule } from '../seat-status/seat-status.module';
import { EventDetailModule } from '../event-detail/event-detail.module';

@Module({
  imports: [TypeOrmModule.forFeature([Seat]), SeatStatusModule, EventDetailModule],
  providers: [SeatService],
  controllers: [SeatController],
  exports: [SeatService],
})
export class SeatModule {}