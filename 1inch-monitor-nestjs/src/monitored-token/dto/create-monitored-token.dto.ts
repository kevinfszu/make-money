import { IsNotEmpty } from 'class-validator';

export class CreateMonitoredTokenDto {
  @IsNotEmpty()
  tokenName: string;

  @IsNotEmpty()
  baseNumber: number;

  @IsNotEmpty()
  baseUnit: string;

  @IsNotEmpty()
  warningLowPrice: number;

  @IsNotEmpty()
  warningHighPrice: number;

  @IsNotEmpty()
  warningRange: number;
}
