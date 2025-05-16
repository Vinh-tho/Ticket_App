import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seat } from '../../entities/Seat';
import { SeatStatusService } from '../seat-status/seat-status.service';
import { EventDetail } from '../../entities/events-detail.entity';
import { EventDetailService } from '../event-detail/event-detail.service';

@Injectable()
export class SeatService {
  constructor(
    @InjectRepository(Seat)
    private seatRepository: Repository<Seat>,
    private seatStatusService: SeatStatusService,
    private eventDetailService: EventDetailService,
  ) {}

  async create(seatData: Partial<Seat>): Promise<Seat> {
    const seat = this.seatRepository.create(seatData);
    const saved = await this.seatRepository.save(seat);
    // Cập nhật capacity cho tất cả event detail thuộc event này
    if (saved.event && saved.event.id) {
      const eventDetails = await this.eventDetailService.findAll();
      for (const detail of eventDetails) {
        if (detail.event && detail.event.id === saved.event.id) {
          await this.eventDetailService.updateCapacity(detail.id);
        }
      }
    }
    return saved;
  }

  async findAll(): Promise<Seat[]> {
    return this.seatRepository.find({
      relations: ['event', 'ticket'],
    });
  }

  async findOne(id: number): Promise<Seat> {
    const seat = await this.seatRepository.findOne({
      where: { id },
      relations: ['event', 'ticket'],
    });
    if (!seat) {
      throw new NotFoundException(`Seat with ID ${id} not found`);
    }
    return seat;
  }

  async findByEvent(eventId: number): Promise<Seat[]> {
    return this.seatRepository.find({
      where: { event: { id: eventId } },
      relations: ['ticket'],
    });
  }

  async createSeatsForEventDetail(eventDetail: EventDetail, seats: Seat[]): Promise<void> {
    for (const seat of seats) {
      await this.seatStatusService.create(seat, eventDetail);
    }
  }

  async getAvailableSeats(eventDetailId: number): Promise<Seat[]> {
    const seatStatuses = await this.seatStatusService.findByEventDetail(eventDetailId);
    return seatStatuses
      .filter((status) => status.status === 'available')
      .map((status) => status.seat);
  }

  async createMany(seats: Partial<Seat>[]): Promise<Seat[]> {
    const seatEntities = this.seatRepository.create(seats);
    return this.seatRepository.save(seatEntities);
  }

  async remove(id: number): Promise<void> {
    const seat = await this.seatRepository.findOne({ where: { id }, relations: ['event'] });
    if (!seat) throw new NotFoundException(`Seat with ID ${id} not found`);
    await this.seatRepository.remove(seat);
    // Cập nhật capacity cho tất cả event detail thuộc event này
    if (seat.event && seat.event.id) {
      const eventDetails = await this.eventDetailService.findAll();
      for (const detail of eventDetails) {
        if (detail.event && detail.event.id === seat.event.id) {
          await this.eventDetailService.updateCapacity(detail.id);
        }
      }
    }
  }
}