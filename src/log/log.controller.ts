import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  NotFoundException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { LogService } from './log.service';
import { CreateLogDTO } from 'src/log/dto/create-log.dto';
import { UpdateLogDTO } from './dto/update-log.dto';
import { Log } from './entities/log.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from 'src/s3/s3.service';

@Controller('log')
export class LogController {
  // private s3Service = new S3Service();

  // LogService 의존성 주입
  constructor(
    private readonly logService: LogService,
    private readonly s3Service: S3Service 
  ) {}

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
  @UseInterceptors(FileInterceptor('image_url'))
  async createLog(
    @UploadedFile() file: Express.Multer.File,
    @Body() logData: CreateLogDTO,
  ) {
    const imageUrl = await this.s3Service.uploadFile(file);
    return this.logService.createLog({ ...logData, image_url: imageUrl });
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
