import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seat } from '../../entities/Seat';
import { Repository } from 'typeorm';
import { Users } from '../../entities/Users';

@Injectable()
export class SeatService {
  constructor(
    @InjectRepository(Seat)
    private seatRepository: Repository<Seat>,
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async findByEvent(eventId: number) {
    return this.seatRepository.find({
      where: { event: { id: eventId } },
      relations: ['event', 'ticket', 'user'],
    });
  }

  async bookSeat(seatId: number, userId: number) {
    const seat = await this.seatRepository.findOne({
      where: { id: seatId },
      relations: ['user'],
    });
    if (!seat || seat.status !== 'available') {
      throw new Error('Ghế không khả dụng hoặc đã được đặt');
    }
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new Error('User không tồn tại');
    seat.status = 'booked';
    seat.user = user;
    seat.holdUntil = null;
    await this.seatRepository.save(seat);
    return seat;
  }
}