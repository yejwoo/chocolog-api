import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { PrismaClient } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient({});
  }

  async getUsers(): Promise<User[]> {
    try {
      const users = await this.prisma.cc_users.findMany();
      return users;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async getUser(email: string): Promise<User | null> {
    try {
      const user = await this.prisma.cc_users.findUnique({
        where: {
          user_email: email,
        },
      });
      return user;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async createUser(userData: CreateUserDto): Promise<CreateUserDto> {
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

  async updateUser(email: string, user: User): Promise<User | null> {
    try {
      const updatedUser = await this.prisma.cc_users.update({
        where: {
          user_email: email,
        },
        data: user,
      });
      return updatedUser;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async deleteUser(email: string): Promise<User | null> {
    try {
      const deletedUser = await this.prisma.cc_users.delete({
        where: {
          user_email: email,
        },
      });
      return deletedUser;
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
