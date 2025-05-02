import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  BadRequestException,
  HttpException,
  HttpStatus,
  Req,
  Logger,
} from '@nestjs/common';
import { Request } from 'express';
import { PaymentsService } from './payments.service';

interface VNPayCreateDTO {
  orderId: number;
  amount: number;
  bankCode?: string;
}

@Controller('payments')
export class PaymentsController {
  private readonly logger = new Logger(PaymentsController.name);

  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('vnpay/create')
  async createPayment(
    @Body() body: VNPayCreateDTO,
    @Req() req: Request,
  ) {
    try {
      const { orderId, amount, bankCode } = body;
      if (!orderId || !amount) {
        throw new BadRequestException('orderId và amount là bắt buộc');
      }

      const ipAddr =
        req.headers['x-forwarded-for']?.toString() ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        '127.0.0.1';

      this.logger.log(`Creating payment URL for order ${orderId} with amount ${amount}`);

      const url = await this.paymentsService.createPaymentUrl(
        orderId, 
        amount, 
        ipAddr,
      );

      return { 
        success: true, 
        paymentUrl: url,
        orderInfo: {
          orderId,
          amount,
          ipAddr,
          bankCode: bankCode || 'Not specified'
        }
      };
    } catch (error) {
      this.logger.error(`Error creating payment URL: ${error.message}`);
      throw new HttpException(
        error.message || 'Lỗi tạo URL thanh toán',
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Get('vnpay/callback')
  async handleVNPayCallback(@Query() query: Record<string, string>) {
    try {
      if (!query.vnp_TxnRef || !query.vnp_SecureHash) {
        throw new BadRequestException('Thiếu thông tin thanh toán');
      }

      this.logger.log(`Received VNPay callback for order ${query.vnp_TxnRef}`);

      const result = await this.paymentsService.handleVNPayCallback(query);
      
      return {
        code: result.success ? '00' : '99',
        message: result.message,
        data: {
          ...result.data,
          responseCode: query.vnp_ResponseCode,
          transactionDate: query.vnp_PayDate
        }
      };
    } catch (error) {
      this.logger.error(`Error handling callback: ${error.message}`);
      throw new HttpException(
        error.message || 'Xử lý callback thất bại',
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Get('vnpay/ipn')
  async handleVNPayIPN(@Query() query: Record<string, string>) {
    try {
      const result = await this.paymentsService.handleVNPayCallback(query);
      return {
        RspCode: result.success ? '00' : '99',
        Message: result.success ? 'Confirm Success' : 'Confirm Fail'
      };
    } catch (error) {
      this.logger.error(`Error handling IPN: ${error.message}`);
      return {
        RspCode: '99',
        Message: 'Unknow error'
      };
    }
  }
}