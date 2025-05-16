import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from '../../entities/order.entity';
import { OrderDetail } from '../../entities/order-detail.entity';
import { Users } from '../../entities/Users';
import { Ticket } from '../../entities/ticket.entity';
import { EventDetail } from '../../entities/events-detail.entity';
import { Seat } from '../../entities/Seat';
import { SeatStatusModule } from '../seat-status/seat-status.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderDetail, Users, Ticket, EventDetail, Seat]),
    SeatStatusModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
