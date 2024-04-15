import { Module } from '@nestjs/common';
import { LogController } from './log.controller';
import { LogService } from './log.service';
import { S3Module } from 'src/s3/s3.module';

@Module({
  imports: [S3Module],
  providers: [LogService],
  controllers: [LogController],
})
export class LogModule {}