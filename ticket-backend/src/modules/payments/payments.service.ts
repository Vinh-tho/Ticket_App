import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../../entities/order.entity';
import { Payment } from '../../entities/Payment';
import { OrderStatus } from '../../common/enums/order-status.enum';
import { OrdersService } from '../order/orders.service';
import {
  createVNPayUrl,
  generateHMAC,
  verifyReturnUrl,
} from '../utils/vnpay.util';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);

  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,
    @InjectRepository(Payment)
    private paymentRepo: Repository<Payment>,
    private readonly ordersService: OrdersService,
  ) {}

  async createPaymentUrl(
    orderId: number,
    amount: number,
    ipAddr: string,
    bankCode?: string,
  ): Promise<string> {
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

      // Tạo bản ghi Payment trạng thái pending nếu chưa có
      let payment = await this.paymentRepo.findOne({
        where: { order: { id: orderId }, paymentStatus: 'pending' },
      });
      if (!payment) {
        payment = this.paymentRepo.create({
          order: { id: orderId } as any,
          amount: Number(amount),
          paymentMethod: 'vnpay',
          paymentStatus: 'pending',
        });
        await this.paymentRepo.save(payment);
        this.logger.log('Created pending payment:', payment);
      }

      return createVNPayUrl({
        orderId,
        amount: Math.round(amount), // đảm bảo là số nguyên
        ipAddr,
        orderInfo: `Thanh toan don hang #${orderId}`,
        bankCode, // truyền bankCode nếu có
      });
    } catch (error) {
      this.logger.error(`Error creating payment URL: ${error.message}`);
      throw error;
    }
  }

  async handleVNPayCallback(query: Record<string, string>) {
    try {
      // Sử dụng verifyReturnUrl để xác thực chữ ký
      const isValid = verifyReturnUrl(query);
      if (!isValid) {
        this.logger.warn('VNPay callback: Invalid secure hash');
        throw new BadRequestException('Invalid secure hash');
      }

      const orderId = parseInt(query.vnp_TxnRef);
      const isSuccess = query.vnp_ResponseCode === '00';
      const orderStatus = isSuccess ? OrderStatus.PAID : OrderStatus.FAILED;

      await this.ordersService.updateOrderStatus(orderId, orderStatus);

      // Cập nhật bản ghi Payment khi thanh toán thành công
      if (isSuccess) {
        let payment = await this.paymentRepo.findOne({
          where: { order: { id: orderId }, paymentStatus: 'pending' },
        });
        if (payment) {
          payment.paymentStatus = 'success';
          payment.amount = Number(query.vnp_Amount) / 100;
          await this.paymentRepo.save(payment);
          this.logger.log('Payment updated to success:', payment);
        } else {
          this.logger.warn(
            'No pending payment found to update for order:',
            orderId,
          );
        }
      }

      return {
        success: isSuccess,
        message: isSuccess ? 'Thanh toán thành công' : 'Thanh toán thất bại',
        data: {
          orderId,
          amount: query.vnp_Amount,
          transactionNo: query.vnp_TransactionNo,
          bankCode: query.vnp_BankCode,
        },
      };
    } catch (error) {
      this.logger.error(`Error handling callback: ${error.message}`);
      throw error;
    }
  }
}
