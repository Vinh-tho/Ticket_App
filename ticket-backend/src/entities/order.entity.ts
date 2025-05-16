import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Users } from './Users';
import { OrderDetail } from './order-detail.entity';
import { Payment } from './Payment';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, (user) => user.orders)
  user: Users;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  orderDate: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
  
  @Column('decimal', { precision: 10, scale: 2 })
  totalAmount: number;

  @Column({ default: 'pending' })
  status: string;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
  orderDetails: OrderDetail[];

  @OneToMany(() => Payment, (payment) => payment.order)
  payments: Payment[];

  @Column({ nullable: true })
  eventDetailId: number;
}