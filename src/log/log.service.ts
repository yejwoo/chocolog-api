import { Injectable, Post } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateLogDTO } from 'src/log/dto/create-log.dto';
import { Log } from './entities/log.entity';
import { UpdateLogDTO } from './dto/update-log.dto';
@Injectable()
export class LogService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient({});
  }

  async getLogs() {
    try {
      const logs = await this.prisma.cc_logs.findMany();
      return logs;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async getLog(lid: number): Promise<Log | null> {
    try {
      const log = await this.prisma.cc_logs.findUnique({
        where: {
          lid,
        },
      });
      return log;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async createLog(logData: CreateLogDTO) {
    try {
      const log = await this.prisma.cc_logs.create({
        data: logData,
      });
      return log;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async updateLog(lid: number, logData: UpdateLogDTO) {
    try {
      const log = await this.prisma.cc_logs.update({
        where: {
          lid,
        },
        data: logData,
      });
      return log;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async deleteLog (lid: number) {
    try {
      await this.prisma.cc_logs.delete({
        where: {
          lid,
        },
      });
      return `Deleted log with ID ${lid}`;
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
