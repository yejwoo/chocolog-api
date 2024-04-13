import { Controller, Get } from '@nestjs/common';

@Controller('record')
export class RecordController {
  @Get()
  getRecord() {
    return 'This is the record controller';
  }
}
