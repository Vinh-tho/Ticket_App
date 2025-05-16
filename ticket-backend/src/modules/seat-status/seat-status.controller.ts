import { Controller, Get, Post, Body, Param, Put, Query } from '@nestjs/common';
import { SeatStatusService } from './seat-status.service';
import { SeatStatus } from '../../entities/seat-status.entity';

@Controller('seat-status')
export class SeatStatusController {
  constructor(private readonly seatStatusService: SeatStatusService) {}

  @Get()
  async findAll(): Promise<SeatStatus[]> {
    return this.seatStatusService.findAll();
  }

  @Get('event-detail/:eventDetailId')
  async findByEventDetail(@Param('eventDetailId') eventDetailId: number): Promise<SeatStatus[]> {
    return this.seatStatusService.findByEventDetail(eventDetailId);
  }

  @Get('event-detail/:eventDetailId/zone-counts')
  async getSeatCountByZone(@Param('eventDetailId') eventDetailId: number) {
    return this.seatStatusService.getSeatCountByZone(eventDetailId);
  }

  @Get('event-detail/:eventDetailId/all')
  async getAllSeatsWithStatus(@Param('eventDetailId') eventDetailId: number) {
    return this.seatStatusService.getAllSeatsWithStatusByEventDetail(+eventDetailId);
  }

  @Put(':id/status')
  async updateStatus(
    @Param('id') id: number,
    @Body() body: { status: string; userId?: number; holdUntil?: Date },
  ): Promise<SeatStatus> {
    return this.seatStatusService.updateStatus(id, body.status, body.userId, body.holdUntil);
  }
} 