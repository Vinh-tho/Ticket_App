import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Order } from '../entities/order.entity';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string; // Mật khẩu đã mã hóa

  // (Tùy chọn) Số điện thoại
  @Column({ nullable: true })
  phone: string;

  // (Tùy chọn) Avatar
  @Column({ nullable: true })
  avatar: string;

  // (Tùy chọn) Quyền của người dùng: 'user' | 'admin'
  @Column({ default: 'user' })
  role: string;

  // Quan hệ 1-n: 1 user có thể có nhiều đơn hàng
  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
