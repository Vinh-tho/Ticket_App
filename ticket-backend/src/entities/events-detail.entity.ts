import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Event } from '../entities/Events';

@Entity('events_detail')
export class EventDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  description: string;

  @Column()
  image_detail: string;

  @Column({ nullable: true })
  location: string;

  @Column({ type: 'datetime' })
  startTime: Date;

  @Column({ type: 'datetime' })
  endTime: Date;

  @OneToOne(() => Event, (event) => event.detail)
  event: Event;
}
