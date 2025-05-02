import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Event } from './Events';

@Entity('event_detail')
export class EventDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Event, (event) => event.eventDetail)
  @JoinColumn({ name: 'eventId' })
  event: Event;

  @Column({ nullable: true })
  detailImageUrl: string; // đổi từ image_detail sang detailImageUrl

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @Column()
  location: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: 'active' })
  status: string;
}