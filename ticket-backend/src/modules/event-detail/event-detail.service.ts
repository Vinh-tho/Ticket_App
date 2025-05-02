import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventDetail } from '../../entities/events-detail.entity';
import { CreateEventDetailDto } from '../../dto/create-event-detail.dto';
import { UpdateEventDetailDto } from '../../dto/update-event-detail.dto';

@Injectable()
export class EventDetailService {
  constructor(
    @InjectRepository(EventDetail)
    private readonly eventDetailRepo: Repository<EventDetail>,
  ) {}

  create(dto: CreateEventDetailDto) {
    const detail = this.eventDetailRepo.create(dto);
    return this.eventDetailRepo.save(detail);
  }

  findAll() {
    return this.eventDetailRepo.find();
  }

  findOne(id: number) {
    return this.eventDetailRepo.findOneBy({ id });
  }

  async update(id: number, dto: UpdateEventDetailDto) {
    const detail = await this.eventDetailRepo.findOneBy({ id });
    if (!detail) throw new NotFoundException('Detail not found');
    return this.eventDetailRepo.save({ ...detail, ...dto });
  }

  async remove(id: number) {
    const detail = await this.eventDetailRepo.findOneBy({ id });
    if (!detail) throw new NotFoundException('Detail not found');
    return this.eventDetailRepo.remove(detail);
  }
}
