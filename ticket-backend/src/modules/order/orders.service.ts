import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../../entities/order.entity';
import { OrderDetail } from '../../entities/order-detail.entity';
import { CreateOrderDto } from '../../dto/create-order.dto';
import { Users } from '../../entities/Users';
import { Ticket } from '../../entities/ticket.entity';
import { OrderStatus } from '../../common/enums/order-status.enum';
import { SeatStatusService } from '../seat-status/seat-status.service';
import { EventDetail } from '../../entities/events-detail.entity';
import { Seat } from '../../entities/Seat';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);

  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,

    @InjectRepository(OrderDetail)
    private itemRepo: Repository<OrderDetail>,

    @InjectRepository(Users)
    private userRepo: Repository<Users>,

    @InjectRepository(Ticket)
    private ticketRepo: Repository<Ticket>,

    @InjectRepository(EventDetail)
    private eventDetailRepo: Repository<EventDetail>,

    @InjectRepository(Seat)
    private seatRepo: Repository<Seat>,

    private seatStatusService: SeatStatusService,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    try {
      const user = await this.userRepo.findOneBy({ id: createOrderDto.userId });
      if (!user) {
        throw new NotFoundException('Không tìm thấy người dùng');
      }

      const items: OrderDetail[] = [];

      return await this.orderRepo.manager.transaction(
        async (transactionalEntityManager) => {
          for (const itemDto of createOrderDto.items) {
            const ticket = await transactionalEntityManager.findOne(Ticket, {
              where: { id: itemDto.ticketId },
              lock: { mode: 'pessimistic_write' },
            });

            if (!ticket) {
              throw new NotFoundException(
                `Không tìm thấy vé ${itemDto.ticketId}`,
              );
            }

            if (itemDto.quantity > ticket.quantity) {
              throw new BadRequestException(
                `Không đủ vé cho ${ticket.type}. Còn lại: ${ticket.quantity}`,
              );
            }

            if (ticket.quantity <= 0) {
              throw new BadRequestException(`Vé ${ticket.type} đã hết`);
            }

            const item = transactionalEntityManager.create(OrderDetail, {
              ticket,
              quantity: itemDto.quantity,
              unitPrice: ticket.price, // Đảm bảo truyền unitPrice
              seatId: itemDto.seatId,
              order: undefined, // Will be set when order is created
            });
            items.push(item);

            ticket.quantity -= itemDto.quantity;
            await transactionalEntityManager.save(ticket);

            // Xử lý seat status nếu có seatId và eventDetailId
            this.logger.log('DEBUG itemDto: ' + JSON.stringify(itemDto));
            this.logger.log('DEBUG createOrderDto: ' + JSON.stringify(createOrderDto));
            if (itemDto.seatId && createOrderDto.eventDetailId) {
              const seat = await transactionalEntityManager.findOne(Seat, { where: { id: itemDto.seatId } });
              const eventDetail = await transactionalEntityManager.findOne(EventDetail, { where: { id: createOrderDto.eventDetailId } });
              if (seat && eventDetail) {
                // Kiểm tra đã có seat_status chưa
                let seatStatus = await transactionalEntityManager.findOne('seat_status', {
                  where: { seat: { id: seat.id }, eventDetail: { id: eventDetail.id } },
                  relations: ['seat', 'eventDetail'],
                });
                if (!seatStatus) {
                  seatStatus = transactionalEntityManager.create('seat_status', {
                    seat,
                    eventDetail,
                    status: 'held',
                    user,
                  });
                } else {
                  (seatStatus as any).status = 'booked';
                  (seatStatus as any).user = user;
                }
                await transactionalEntityManager.save('seat_status', seatStatus);
                this.logger.log('DEBUG seat_status saved: ' + JSON.stringify(seatStatus));
              }
            }
          }

          // Tính lại tổng tiền đúng chuẩn
          let total = 0;
          for (const item of items) {
            total += Number(item.unitPrice) * Number(item.quantity);
          }

          const order = transactionalEntityManager.create(Order, {
            user,
            totalAmount: total,
            items,
            eventDetailId: createOrderDto.eventDetailId,
            status: OrderStatus.PENDING,
            createdAt: new Date(),
            updatedAt: new Date(),
          });

          // Save order first
          const savedOrder = await transactionalEntityManager.save(order);

          // Update order reference in items and save them
          for (const item of items) {
            item.order = savedOrder;
            await transactionalEntityManager.save(item);
          }

          return savedOrder;
        },
      );
    } catch (error) {
      this.logger.error(`Error creating order: ${error.message}`);
      throw error;
    }
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepo.find({
      relations: ['user', 'orderDetails', 'orderDetails.ticket'],
      order: { orderDate: 'DESC' },
    });
  }

  async findOne(id: number): Promise<any> {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: ['user', 'orderDetails', 'orderDetails.ticket'],
    });

    if (!order) {
      throw new NotFoundException('Không tìm thấy đơn hàng');
    }

    // Bổ sung totalLine cho từng orderDetail
    const orderDetailsWithTotal = order.orderDetails.map((item) => ({
      ...item,
      totalLine: Number(item.unitPrice) * Number(item.quantity),
    }));

    return {
      ...order,
      orderDetails: orderDetailsWithTotal,
      totalAmount: order.totalAmount,
    };
  }

  async findByUserId(userId: number): Promise<Order[]> {
    return this.orderRepo.find({
      where: { user: { id: userId } },
      relations: [
        'orderDetails', 
        'orderDetails.ticket', 
        'orderDetails.ticket.event',
        'orderDetails.ticket.event.eventDetails'
      ],
      order: { orderDate: 'DESC' },
    });
  }

  async remove(id: number): Promise<void> {
    const result = await this.orderRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Không tìm thấy đơn hàng');
    }
  }

  async updateOrderStatus(
    orderId: number,
    status: OrderStatus,
  ): Promise<Order> {
    try {
      const order = await this.orderRepo.findOne({
        where: { id: orderId },
        relations: ['orderDetails', 'orderDetails.ticket'],
      });

      if (!order) {
        throw new NotFoundException('Không tìm thấy đơn hàng');
      }

      if (order.status === OrderStatus.PAID) {
        throw new BadRequestException(
          'Đơn hàng đã thanh toán không thể cập nhật',
        );
      }

      if (status === OrderStatus.CANCELLED) {
        await this.orderRepo.manager.transaction(
          async (transactionalEntityManager) => {
            for (const item of order.orderDetails) {
              const ticket = await transactionalEntityManager.findOne(Ticket, {
                where: { id: item.ticket.id },
                lock: { mode: 'pessimistic_write' },
              });

              if (ticket) {
                ticket.quantity += item.quantity;
                await transactionalEntityManager.save(ticket);
              }
            }
          },
        );
      }

      if (status === OrderStatus.PAID) {
        await this.orderRepo.manager.transaction(async (transactionalEntityManager) => {
          for (const item of order.orderDetails) {
            if (item.seatId && order.eventDetailId) {
              const seatStatus = await transactionalEntityManager.findOne('seat_status', {
                where: { seat: { id: item.seatId }, eventDetail: { id: order.eventDetailId } },
                relations: ['seat', 'eventDetail'],
              });
              if (seatStatus) {
                (seatStatus as any).status = 'booked';
                await transactionalEntityManager.save('seat_status', seatStatus);
              }
            }
          }
        });
      }

      order.status = status;
      order.updatedAt = new Date();

      const savedOrder = await this.orderRepo.save(order);

      this.logger.log(`Order ${orderId} status updated to ${status}`);

      return savedOrder;
    } catch (error) {
      this.logger.error(`Error updating order status: ${error.message}`);
      throw error;
    }
  }
}
