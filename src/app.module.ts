import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { LogService } from './log/log.service';
import { LogController } from './log/log.controller';

@Module({
  imports: [],
  controllers: [AppController, LogController],
  providers: [LogService],
})
export class AppModule {}
