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
      relations: ['eventDetails', 'tickets', 'createdBy'],
    });
  }

  async findOne(id: number): Promise<Event | null> {
    return this.eventRepository.findOne({
      where: { id },
      relations: ['eventDetails', 'tickets', 'createdBy'],
    });
  }

  async create(dto: CreateEventDto, createdBy: number): Promise<Event> {
    const newEvent = this.eventRepository.create({
      eventName: dto.eventName,
      mainImageUrl: dto.mainImageUrl,
      createdBy: { id: createdBy },
      eventDetails: dto.eventDetails,
    });
  
    return this.eventRepository.save(newEvent);
  }
}
