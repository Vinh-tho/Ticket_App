import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from '../../dto/create-ticket.dto';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.create(createTicketDto);
  }

  @Get()
  findAll() {
    return this.ticketsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const ticket = await this.ticketsService.findOne(id);
      return {
        success: true,
        data: ticket
      };
    } catch (error) {
      throw new NotFoundException(`Không tìm thấy vé với id ${id}`);
    }
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ticketsService.remove(id);
  }
}
