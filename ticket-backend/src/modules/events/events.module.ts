import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { Event } from '../../entities/Events';
import { EventDetailModule } from '../event-detail/event-detail.module'; // <- THÊM
import { EventDetail } from '../../entities/events-detail.entity'; // <- NẾU dùng trong TypeOrmModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Event, EventDetail]), // <- thêm EventDetail nếu cần query
    EventDetailModule, // <- THÊM
  ],
  controllers: [EventsController],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsModule {}
