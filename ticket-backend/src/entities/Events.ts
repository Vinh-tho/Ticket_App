import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { EventDetail } from '../entities/events-detail.entity';
import { Ticket } from '../entities/ticket.entity'; // Đường dẫn đến file ticket.entity.ts

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  imageUrl: string;

  @Column()
  createdBy: string;

  // Quan hệ 1-1 với chi tiết sự kiện
  @OneToOne(() => EventDetail, (detail) => detail.event, { cascade: true })
  @JoinColumn()
  detail: EventDetail;

  // Quan hệ 1-n với các loại vé
  @OneToMany(() => Ticket, (ticket) => ticket.event, { cascade: true })
  tickets: Ticket[];
}
