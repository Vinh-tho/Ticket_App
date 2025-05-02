import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '../../entities/Events';
import { CreateEventDto } from '../../dto/event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async findAll(): Promise<Event[]> {
    return this.eventRepository.find({
      relations: ['eventDetail', 'tickets', 'createdBy'], // Thêm 'tickets' để lấy thông tin từ bảng tickets
    });
  }

  async findOne(id: number): Promise<Event | null> {
    return this.eventRepository.findOne({
      where: { id },
      relations: ['eventDetail', 'tickets', 'createdBy'], // Thêm 'tickets' để lấy thông tin từ bảng tickets
    });
  }

  async create(dto: CreateEventDto, createdBy: number): Promise<Event> {
    const newEvent = this.eventRepository.create({
      eventName: dto.eventName,
      mainImageUrl: dto.mainImageUrl,
      createdBy: { id: createdBy }, // Sửa lại kiểu dữ liệu cho đúng
      eventDetail: dto.eventDetail,
    });
  
    return this.eventRepository.save(newEvent);
  }
}
