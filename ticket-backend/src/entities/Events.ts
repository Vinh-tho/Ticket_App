import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Users } from './Users';
import { EventDetail } from './events-detail.entity';
import { Ticket } from './ticket.entity';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  eventName: string;

  @Column({ nullable: true })
  mainImageUrl: string;

  @ManyToOne(() => Users, (user) => user.id)
  @JoinColumn({ name: 'createdBy' })
  createdBy: Users;

  @OneToOne(() => EventDetail, (detail) => detail.event, { cascade: true })
  eventDetail: EventDetail;

  @OneToMany(() => Ticket, (ticket) => ticket.event)
  tickets: Ticket[];
}