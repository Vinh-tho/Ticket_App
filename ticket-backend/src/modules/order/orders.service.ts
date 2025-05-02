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
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    try {
      const user = await this.userRepo.findOneBy({ id: createOrderDto.userId });
      if (!user) {
        throw new NotFoundException('Không tìm thấy người dùng');
      }

      let total = 0;
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

            total += ticket.price * itemDto.quantity;

            const item = transactionalEntityManager.create(OrderDetail, {
              ticket,
              quantity: itemDto.quantity,
              seat: itemDto.seat,
              price: ticket.price,
              order: undefined, // Will be set when order is created
            });
            items.push(item);

            ticket.quantity -= itemDto.quantity;
            await transactionalEntityManager.save(ticket);
          }

          const order = transactionalEntityManager.create(Order, {
            user,
            totalAmount: total,
            items,
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
      relations: ['user', 'items', 'items.ticket'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: ['user', 'items', 'items.ticket'],
    });

    if (!order) {
      throw new NotFoundException('Không tìm thấy đơn hàng');
    }

    return order;
  }

  async findByUserId(userId: number): Promise<Order[]> {
    return this.orderRepo.find({
      where: { user: { id: userId } },
      relations: ['items', 'items.ticket'],
      order: { createdAt: 'DESC' },
    });
  }

  async remove(id: number): Promise<void> {
    const result = await this.orderRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Không tìm thấy đơn hàng');
    }
  }

  async updateOrderStatus(orderId: number, status: OrderStatus): Promise<Order> {
    try {
      const order = await this.orderRepo.findOne({
        where: { id: orderId },
        relations: ['items', 'items.ticket'],
      });

      if (!order) {
        throw new NotFoundException('Không tìm thấy đơn hàng');
      }

      if (order.status === OrderStatus.PAID) {
        throw new BadRequestException('Đơn hàng đã thanh toán không thể cập nhật');
      }

      if (status === OrderStatus.CANCELLED) {
        await this.orderRepo.manager.transaction(
          async (transactionalEntityManager) => {
            for (const item of order.items) {
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