import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventDetail } from '../../entities/events-detail.entity';
import { EventDetailService } from './event-detail.service';
import { EventDetailController } from './event-detail.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EventDetail])],
  controllers: [EventDetailController],
  providers: [EventDetailService],
  exports: [EventDetailService], // export nếu cần dùng ở EventModule
})
export class EventDetailModule {}
