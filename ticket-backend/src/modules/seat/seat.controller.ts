import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { SeatService } from './seat.service';
import { Seat } from '../../entities/Seat';

@Controller('seats')
export class SeatController {
  constructor(private readonly seatService: SeatService) {}

  @Post()
  async create(@Body() seatData: Partial<Seat>): Promise<Seat> {
    return this.seatService.create(seatData);
  }

  @Post('bulk')
  async createMany(@Body() seats: Partial<Seat>[]): Promise<Seat[]> {
    return this.seatService.createMany(seats);
  }

  @Get()
  async findAll(): Promise<Seat[]> {
    return this.seatService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Seat> {
    return this.seatService.findOne(id);
  }

  @Get('event/:eventId')
  async findByEvent(@Param('eventId') eventId: number): Promise<Seat[]> {
    return this.seatService.findByEvent(eventId);
  }

  @Get('event-detail/:eventDetailId/available')
  async getAvailableSeats(@Param('eventDetailId') eventDetailId: number): Promise<Seat[]> {
    return this.seatService.getAvailableSeats(eventDetailId);
  }
}