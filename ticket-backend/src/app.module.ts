import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Users } from './entities/Users';
import { Event } from './entities/Events';
import { EventDetail } from './entities/events-detail.entity';
import { Ticket } from './entities/ticket.entity';
import { Order } from './entities/order.entity';
import { OrderDetail } from './entities/order-detail.entity';
import { Payment } from './entities/Payment';
import { Notification } from './entities/Notification';
import { Seat } from './entities/Seat';
import { SeatStatus } from './entities/seat-status.entity';
import { UserModule } from './modules/users/user.module';
import { EventsModule } from './modules/events/events.module';
import { AuthModule } from './modules/auth/auth.module';
import { TicketsModule } from './modules/ticket/tickets.module';
import { OrdersModule } from './modules/order/orders.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { SeatModule } from './modules/seat/seat.module';
import { SeatStatusModule } from './modules/seat-status/seat-status.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345',
      database: 'ticket-box',
      entities: [
        Users,
        Event,
        EventDetail,
        Ticket,
        Order,
        OrderDetail,
        Payment,
        Notification,
        Seat,
        SeatStatus,
      ],
      synchronize: true,
    }),
    UserModule,
    EventsModule,
    AuthModule,
    TicketsModule,
    OrdersModule,
    PaymentsModule,
    SeatModule,
    SeatStatusModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
