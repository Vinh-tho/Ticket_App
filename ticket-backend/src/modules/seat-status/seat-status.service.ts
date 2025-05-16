import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SeatStatus } from '../../entities/seat-status.entity';
import { Seat } from '../../entities/Seat';
import { EventDetail } from '../../entities/events-detail.entity';

@Injectable()
export class SeatStatusService {
  constructor(
    @InjectRepository(SeatStatus)
    private seatStatusRepository: Repository<SeatStatus>,
  ) {}

  async create(seat: Seat, eventDetail: EventDetail): Promise<SeatStatus> {
    const seatStatus = this.seatStatusRepository.create({
      seat,
      eventDetail,
      status: 'available',
    });
    return this.seatStatusRepository.save(seatStatus);
  }

  async findAll(): Promise<SeatStatus[]> {
    return this.seatStatusRepository.find({
      relations: ['seat', 'eventDetail', 'user'],
    });
  }

  async findByEventDetail(eventDetailId: number): Promise<SeatStatus[]> {
    return this.seatStatusRepository.find({
      where: { eventDetail: { id: eventDetailId } },
      relations: ['seat', 'user'],
    });
  }

  async updateStatus(id: number, status: string, userId?: number, holdUntil?: Date): Promise<SeatStatus> {
    const seatStatus = await this.seatStatusRepository.findOne({ where: { id } });
    if (!seatStatus) {
      throw new Error('Seat status not found');
    }

    seatStatus.status = status;
    if (userId) {
      seatStatus.user = { id: userId } as any;
    }
    if (holdUntil) {
      seatStatus.holdUntil = holdUntil;
    }

    return this.seatStatusRepository.save(seatStatus);
  }

  async getSeatCountByZone(eventDetailId: number): Promise<{ zone: string; total: number; available: number }[]> {
    const seatStatuses = await this.seatStatusRepository
      .createQueryBuilder('seatStatus')
      .leftJoinAndSelect('seatStatus.seat', 'seat')
      .where('seatStatus.eventDetail.id = :eventDetailId', { eventDetailId })
      .getMany();

    const zoneCounts = new Map<string, { total: number; available: number }>();

    seatStatuses.forEach((status) => {
      const zone = status.seat.zone;
      if (!zoneCounts.has(zone)) {
        zoneCounts.set(zone, { total: 0, available: 0 });
      }
      const counts = zoneCounts.get(zone)!;
      counts.total++;
      if (status.status === 'available') {
        counts.available++;
      }
    });

    return Array.from(zoneCounts.entries()).map(([zone, counts]) => ({
      zone,
      ...counts,
    }));
  }

  async getAllSeatsWithStatusByEventDetail(eventDetailId: number): Promise<any[]> {
    // Lấy eventDetail và event
    const eventDetail = await this.seatStatusRepository.manager.findOne(EventDetail, {
      where: { id: eventDetailId },
      relations: ['event'],
    });
    if (!eventDetail) throw new Error('EventDetail not found');
    // Lấy tất cả ghế của event
    const seats = await this.seatStatusRepository.manager.find(Seat, {
      where: { event: { id: eventDetail.event.id } },
    });
    // Lấy tất cả seat_status của eventDetail này
    const seatStatuses = await this.seatStatusRepository.find({
      where: { eventDetail: { id: eventDetailId } },
      relations: ['seat', 'user'],
    });
    // Map seatId -> seatStatus
    const statusMap = new Map<number, SeatStatus>();
    seatStatuses.forEach((ss) => {
      statusMap.set(ss.seat.id, ss);
    });
    // Trả về danh sách ghế kèm trạng thái
    return seats.map((seat) => {
      const statusObj = statusMap.get(seat.id);
      return {
        id: seat.id,
        name: seat.zone + seat.row + seat.number,
        zone: seat.zone,
        row: seat.row,
        number: seat.number,
        status: statusObj ? statusObj.status : 'available',
        user: statusObj ? statusObj.user : null,
      };
    });
  }
} 