import { Controller, Get, Post, Patch, Delete, Body } from '@nestjs/common';
import { LogService } from './log.service';
import { CreateLogDTO } from 'src/log/dto/create-log.dto';

@Controller('log')
export class LogController {
  // LogService 의존성 주입
  constructor(private readonly logService: LogService) {}

  @Get()
  getLogs() {
    return 'This is logs';
  }

  getLog() {
    return 'This is a log';
  }

  @Post()
  createLog(@Body() logData: CreateLogDTO) {
    return this.logService.createLog(logData); // 인스턴스를 통한 메서드 호출
  }

  @Patch()
  updateLog() {
    return 'Log updated';
  }

  @Delete()
  deleteLog() {
    return 'Log deleted';
  }
}
