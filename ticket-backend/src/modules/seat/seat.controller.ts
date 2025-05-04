import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SeatService } from './seat.service';

@Controller('seats')
export class SeatController {
  constructor(private readonly seatService: SeatService) {}

  @Get('event/:eventId')
  getSeatsByEvent(@Param('eventId') eventId: number) {
    return this.seatService.findByEvent(eventId);
  }

  @Post('book')
  async bookSeat(@Body() body: { seatId: number; userId: number }) {
    return this.seatService.bookSeat(body.seatId, body.userId);
  }
}