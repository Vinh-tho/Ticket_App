import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from '../../entities/order.entity';
import { OrderDetail } from '../../entities/order-detail.entity';
import { Users } from '../../entities/Users';
import { Ticket } from '../../entities/ticket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderDetail, Users, Ticket])],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
