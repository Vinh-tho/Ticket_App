import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  ParseIntPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from '../../dto/create-order.dto';
import { OrderStatus } from '../../common/enums/order-status.enum';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // ...existing code...

  @Patch(':id/pay')
  async markAsPaid(@Param('id', ParseIntPipe) id: number) {
    try {
      const updatedOrder = await this.ordersService.updateOrderStatus(id, OrderStatus.PAID);
      return {
        success: true,
        message: 'Cập nhật trạng thái thanh toán thành công',
        data: updatedOrder
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Lỗi cập nhật trạng thái thanh toán',
        HttpStatus.BAD_REQUEST
      );
    }
  }
}