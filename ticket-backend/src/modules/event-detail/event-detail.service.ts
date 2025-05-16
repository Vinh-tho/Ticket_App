import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventDetail } from '../../entities/events-detail.entity';
import { CreateEventDetailDto } from '../../dto/create-event-detail.dto';
import { UpdateEventDetailDto } from '../../dto/update-event-detail.dto';
import { SeatStatus } from '../../entities/seat-status.entity';
import { Seat } from '../../entities/Seat';

@Injectable()
export class EventDetailService {
  constructor(
    @InjectRepository(EventDetail)
    private readonly eventDetailRepo: Repository<EventDetail>,
    @InjectRepository(SeatStatus)
    private readonly seatStatusRepo: Repository<SeatStatus>,
    @InjectRepository(Seat)
    private readonly seatRepo: Repository<Seat>,
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

  async updateCapacity(eventDetailId: number) {
    const eventDetail = await this.eventDetailRepo.findOne({
      where: { id: eventDetailId },
      relations: ['event'],
    });
    if (!eventDetail) return;
    const eventId = eventDetail.event.id;
    const seatCount = await this.seatRepo.count({ where: { event: { id: eventId } } });
    await this.eventDetailRepo.update(eventDetailId, { capacity: seatCount });
  }

  async recalculateAllCapacities() {
    const allEventDetails = await this.eventDetailRepo.find({ relations: ['event'] });
    for (const detail of allEventDetails) {
      const eventId = detail.event.id;
      const seatCount = await this.seatRepo.count({ where: { event: { id: eventId } } });
      await this.eventDetailRepo.update(detail.id, { capacity: seatCount });
    }
    return 'Đã cập nhật lại capacity cho tất cả event detail!';
  }
}
