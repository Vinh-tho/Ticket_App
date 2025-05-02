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
      relations: ['detail', 'tickets'], // Thêm 'tickets' để lấy thông tin từ bảng tickets
    });
  }

  async findOne(id: number): Promise<Event | null> {
    return this.eventRepository.findOne({
      where: { id },
      relations: ['detail', 'tickets'], // Thêm 'tickets' để lấy thông tin từ bảng tickets
    });
  }

  async create(dto: CreateEventDto, createdBy: string): Promise<Event> {
    const newEvent = this.eventRepository.create({
      title: dto.title,
      imageUrl: dto.imageUrl,
      createdBy,
      detail: dto.detail, // Tạo luôn cả event_detail
    });

    return this.eventRepository.save(newEvent); // Tự lưu cả hai bảng nhờ cascade
  }
}
