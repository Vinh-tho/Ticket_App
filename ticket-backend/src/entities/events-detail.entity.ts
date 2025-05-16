import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Event } from './Events';
import { SeatStatus } from './seat-status.entity';

@Entity('event_detail')
export class EventDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Event, (event) => event.eventDetails)
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

  @Column({ nullable: true })
  capacity: number;

  @OneToMany(() => SeatStatus, (seatStatus) => seatStatus.eventDetail, {
    cascade: true,
  })
  seatStatuses: SeatStatus[];
}