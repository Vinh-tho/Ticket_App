import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from '../../entities/ticket.entity';
import { CreateTicketDto } from '../../dto/create-ticket.dto';
import { Event } from '../../entities/Events';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepo: Repository<Ticket>,

    @InjectRepository(Event)
    private eventRepo: Repository<Event>,
  ) {}

  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const event = await this.eventRepo.findOneBy({
      id: createTicketDto.eventId,
    });
    if (!event) throw new NotFoundException('Event not found');

    const ticket = this.ticketRepo.create({ ...createTicketDto, event });
    return this.ticketRepo.save(ticket);
  }

  findAll(): Promise<Ticket[]> {
    return this.ticketRepo.find({ relations: ['event'] });
  }

  async findOne(id: number): Promise<Ticket> {
    const ticket = await this.ticketRepo.findOne({
      where: { id },
      relations: ['event', 'event.eventDetail'],
    });

    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }

    return ticket;
  }

  async remove(id: number): Promise<void> {
    const result = await this.ticketRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Ticket not found');
  }
}
