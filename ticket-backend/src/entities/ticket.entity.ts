import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Event } from './Events';

export enum TicketType {
  NORMAL = 'Normal',
  VIP = 'VIP',
  VVIP = 'VVIP',
}

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: TicketType,
    default: TicketType.NORMAL,
  })
  type: TicketType;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @Column('text', { nullable: true })
  seat: string;

  @Column()
  seatCount: number;

  @ManyToOne(() => Event, (event) => event.tickets, { onDelete: 'CASCADE' })
  event: Event;
}
