import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../../dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  // ✅ Đăng ký người dùng mới
  async register(data: { name: string; email: string; password: string }) {
    const { name, email, password } = data;

    // Kiểm tra email đã tồn tại chưa
    const existingUserByEmail = await this.usersService.findByEmail(email);
    if (existingUserByEmail) {
      throw new ConflictException('Email đã được sử dụng');
    }

    // Kiểm tra tên đã tồn tại chưa
    const existingUserByName = await this.usersService.findByName(name);
    if (existingUserByName) {
      throw new ConflictException('Tên người dùng đã được sử dụng');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.usersService.createUser({
      name,
      email,
      password: hashedPassword,
    });

    return {
      message: 'Đăng ký thành công',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    };
  }

  // ✅ Đăng nhập
  async login({ email, password }: LoginDto) {
    const user = await this.usersService.findByEmailOrName(email); // đây có thể là username hoặc email

    if (!user) {
      throw new UnauthorizedException('Email hoặc tên đăng nhập không tồn tại');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Sai mật khẩu');
    }

    const payload = { sub: user.id, email: user.email };
    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
