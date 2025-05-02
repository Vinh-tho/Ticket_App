import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../../entities/Users';
import { ILike, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async createUser(userData: Partial<Users>): Promise<Users> {
    const user = this.userRepository.create(userData);
    const hashPassword = await bcrypt.hash(userData.password!, 10);
    user.password = hashPassword;
    return this.userRepository.save(user);
  }

  findByEmail(email: string) {
    const user = this.userRepository.findOneBy({ email });
    return user;
  }

  async validateUser(email: string, password: string) {
    const user = await this.findByEmailOrName(email);
    console.log('[validateUser] tìm thấy user:', user);

    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('[validateUser] mật khẩu đúng:', isMatch);

    if (isMatch) return user;

    return null;
  }

  async findByName(name: string): Promise<Users | null> {
    return this.userRepository.findOneBy({ name });
  }

  async findByEmailOrName(identifier: string): Promise<Users | null> {
    return this.userRepository.findOne({
      where: [{ email: ILike(identifier) }, { name: ILike(identifier) }],
    });
  }

  findAll(): Promise<Users[]> {
    return this.userRepository.find();
  }
}
