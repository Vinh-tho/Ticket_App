import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  // Lấy danh sách sự kiện
  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  // Lấy chi tiết sự kiện theo ID
  @Get(':id')
  async findOne(@Param('id') id: number) {
    const event = await this.eventsService.findOne(id);
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    return event;
  }
}
