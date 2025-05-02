import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Event } from './Events';
import { OrderDetail } from './order-detail.entity';

@Entity('ticket')
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Event, (event) => event.tickets)
  event: Event;

  @Column()
  type: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  quantity: number;

  @Column({ default: 'available' })
  status: string;

  @Column({ nullable: true })
  seat: string;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.ticket)
  orderDetails: OrderDetail[];
}