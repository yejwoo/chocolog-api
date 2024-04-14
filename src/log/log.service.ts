import { Injectable, Post } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateLogDTO } from 'src/log/dto/create-log.dto';
@Injectable()
export class LogService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient({});
  }

  async createLog(logData: CreateLogDTO) {
    try {
      const test = await this.prisma.cc_logs.create({
        data: logData,
      });
      return test;
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
