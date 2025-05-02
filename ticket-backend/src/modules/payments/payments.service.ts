import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../../entities/order.entity';
import { OrderStatus } from '../../common/enums/order-status.enum';
import { OrdersService } from '../order/orders.service';
import { createVNPayUrl, generateHMAC } from '../utils/vnpay.util';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);

  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,
    private readonly ordersService: OrdersService,
  ) {}

  async createPaymentUrl(orderId: number, amount: number, ipAddr: string): Promise<string> {
    try {
      const order = await this.orderRepo.findOne({ where: { id: orderId } });
      if (!order) {
        throw new BadRequestException('Đơn hàng không tồn tại');
      }

      if (order.status === OrderStatus.PAID) {
        throw new BadRequestException('Đơn hàng đã được thanh toán');
      }

      // Cập nhật trạng thái đơn hàng sang pending
      await this.orderRepo.update(orderId, { status: OrderStatus.PENDING });

      return createVNPayUrl({ 
        orderId, 
        amount,
        ipAddr,
        orderInfo: `Thanh toan don hang #${orderId}`
      });
    } catch (error) {
      this.logger.error(`Error creating payment URL: ${error.message}`);
      throw error;
    }
  }

  async handleVNPayCallback(query: Record<string, string>) {
    try {
      // ... verify hash code ...

      const orderId = parseInt(query.vnp_TxnRef);
      const isSuccess = query.vnp_ResponseCode === '00';
      const orderStatus = isSuccess ? OrderStatus.PAID : OrderStatus.FAILED;

      await this.ordersService.updateOrderStatus(orderId, orderStatus);

      return {
        success: isSuccess,
        message: isSuccess ? 'Thanh toán thành công' : 'Thanh toán thất bại',
        data: {
          orderId,
          amount: query.vnp_Amount,
          transactionNo: query.vnp_TransactionNo,
          bankCode: query.vnp_BankCode
        }
      };
    } catch (error) {
      this.logger.error(`Error handling callback: ${error.message}`);
      throw error;
    }
  }
}