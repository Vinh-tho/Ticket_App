import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Ticket } from './ticket.entity';
import { Event } from './Events';
import { Users } from './Users';

@Entity('seat')
export class Seat {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Event, (event) => event.id)
  event: Event;

  @ManyToOne(() => Ticket, (ticket) => ticket.id)
  ticket: Ticket;

  @Column()
  zone: string; // Khu vực (VIP, VVIP, GA...)

  @Column()
  row: string; // Hàng ghế (A, B, C...)

  @Column()
  number: number; // Số ghế

  @Column({ default: 'available' })
  status: string; // available, held, booked

  @ManyToOne(() => Users, (user) => user.id, { nullable: true })
  user: Users;// Người giữ/đặt ghế (nếu có)

  @Column({ type: 'datetime', nullable: true })
  holdUntil: Date | null; // Thời gian giữ ghế tạm thời (nếu có)
}