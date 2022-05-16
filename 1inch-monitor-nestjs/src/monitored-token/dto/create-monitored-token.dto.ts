import { IsNotEmpty } from 'class-validator';

export class CreateMonitoredTokenDto {
  @IsNotEmpty()
  tokenName: string;

  @IsNotEmpty()
  warningLowPrice: number;

  @IsNotEmpty()
  warningHighPrice: number;

  @IsNotEmpty()
  warningRange: number;
}
