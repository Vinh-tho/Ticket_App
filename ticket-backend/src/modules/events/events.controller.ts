import { Controller, Get, NotFoundException, Param, Post, Body } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from '../../dto/event.dto';

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

  // Tạo sự kiện mới
  @Post()
  async create(@Body() dto: CreateEventDto) {
    // Nếu có xác thực, thay 1 bằng userId thực tế
    return this.eventsService.create(dto, 25);
  }
}
