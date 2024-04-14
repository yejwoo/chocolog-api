import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  private prisma: PrismaClient;

  constructor(private jwtService: JwtService) {
    this.prisma = new PrismaClient({});
  }

  verifyToken(token: string): any {
    // 토큰이 서버에서 발급된 것인지 확인
    try {
      return this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  async createToken(uid: number, email: string) {
    const [access_token, refresh_token] = [
      this.jwtService.sign({ email, sub: uid }),
      this.jwtService.sign({ email, sub: uid }, { expiresIn: '7d' }),
    ];
    return { access_token, refresh_token };
  }

  async updateRefreshToken(uid: number, refresh_token: string) {
    await this.prisma.cc_users.update({
      where: { uid },
      data: { refresh_token },
    });
  }

  async register(userData: CreateUserDto) {
    try {
      const defaultData = {
        ...userData,
        refresh_token: '',
        is_expired: false,
      };
      const user = await this.prisma.cc_users.create({
        data: defaultData,
      });
      return user;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async signin(user: any) {
    const payload = { email: user.user_email, sub: user.uid };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, pass: string): Promise<any> {
    try {
      const user = await this.prisma.cc_users.findUnique({
        where: { user_email: email },
      });
      if (user && (await bcrypt.compare(pass, user.user_pw))) {
        const { user_pw, ...result } = user;
        return result;
      }
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async getUser(uid: number) {
    try {
      const user = this.prisma.cc_users.findUnique({
        where: { uid },
      });
      if (!user) {
        throw new NotFoundException(`User with id ${uid} not found`);
      }
      return user;
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
