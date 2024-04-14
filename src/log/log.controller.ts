import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { LogService } from './log.service';
import { CreateLogDTO } from 'src/log/dto/create-log.dto';
import { UpdateLogDTO } from './dto/update-log.dto';
import { Log } from './entities/log.entity';

@Controller('log')
export class LogController {
  // LogService 의존성 주입
  constructor(private readonly logService: LogService) {}

  @Get()
  getLogs() {
    return this.logService.getLogs();
  }

  @Get('/:id')
  async getLog(@Param('id') lid: number): Promise<Log> {
    const log = await this.logService.getLog(lid);
    if (!log) {
      throw new NotFoundException(`Log with ID ${lid} not found`);
    }
    return log;
  }

  @Post()
  async createLog(@Body() logData: CreateLogDTO) {
    return this.logService.createLog(logData); // 인스턴스를 통한 메서드 호출
  }

  @Patch('/:id')
  updateLog(@Param('id') lid: number, @Body() logData: UpdateLogDTO) {
    return this.logService.updateLog(lid, logData);
  }

  @Delete('/:id')
  deleteLog(@Param('id') lid: number) {
    return this.logService.deleteLog(lid);
  }
}
