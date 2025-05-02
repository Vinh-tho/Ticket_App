import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/Users';
import { EventsModule } from './modules/events/events.module';
import { AuthModule } from './modules/auth/auth.module';
import { Event } from './entities/Events';
import { EventDetail } from './entities/events-detail.entity';
import { Ticket } from './entities/ticket.entity';
import { Order } from './entities/order.entity';
import { OrderDetail } from './entities/order-detail.entity';
import { TicketsModule } from './modules/ticket/tickets.module';
import { OrdersModule } from './modules/order/orders.module';
import { PaymentsModule } from './modules/payments/payments.module'; // ✅ THÊM DÒNG NÀY
import { Payment } from './entities/Payment';
import { Notification } from './entities/Notification';

@Module({
  imports: [
    UserModule,
    EventsModule,
    AuthModule,
    TicketsModule, // ✅ THÊM DÒNG NÀY
    OrdersModule,
    PaymentsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '12345',
      database: 'ticket-box',
      entities: [Users, Event, EventDetail, Ticket, Order, OrderDetail, Payment, Notification],
      synchronize: true, // Đổi thành false để dùng migration
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
