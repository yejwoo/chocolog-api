import { PartialType } from '@nestjs/swagger';
import { CreateLogDTO } from './create-log.dto';

export class UpdateLogDTO extends PartialType(CreateLogDTO) {}
