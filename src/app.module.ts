import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RecordController } from './record/record.controller';
import { RecordService } from './record/record.service';

@Module({
  imports: [],
  controllers: [AppController, RecordController],
  providers: [RecordService],
})
export class AppModule {}
