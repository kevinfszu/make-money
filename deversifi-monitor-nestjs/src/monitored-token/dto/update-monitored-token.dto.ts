import { PartialType } from '@nestjs/mapped-types';
import { CreateMonitoredTokenDto } from './create-monitored-token.dto';

export class UpdateMonitoredTokenDto extends PartialType(CreateMonitoredTokenDto) {}
