import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeatStatus } from '../../entities/seat-status.entity';
import { SeatStatusService } from './seat-status.service';
import { SeatStatusController } from './seat-status.controller';
import { EventDetailModule } from '../event-detail/event-detail.module';

@Module({
  imports: [TypeOrmModule.forFeature([SeatStatus]), EventDetailModule],
  providers: [SeatStatusService],
  controllers: [SeatStatusController],
  exports: [SeatStatusService],
})
export class SeatStatusModule {} 