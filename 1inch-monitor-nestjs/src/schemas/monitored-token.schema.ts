import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as dayjs from 'dayjs';

export type MonitoredTokenDocument = MonitoredToken & Document;

@Schema()
export class MonitoredToken {
  @Prop()
  tokenName: string;

  @Prop({ default: '' })
  tokenAddress: string;

  @Prop({ default: 0 })
  decimals: number;

  @Prop({ default: 0 })
  currentPrice: number;

  @Prop({ default: 0 })
  lastPrice: number;

  @Prop({ default: '' })
  errorMsg: string;

  @Prop({ default: 0 })
  warningLowPrice: number;

  @Prop({ default: 0 })
  warningHighPrice: number;

  @Prop({ default: 0 })
  warningRange: number;

  @Prop({ default: 'WoopWoop.mp3' })
  warningTone: string;

  @Prop({ default: dayjs().format('YYYY-MM-DD HH:mm:ss') })
  updateTime: string;
}

export const MonitoredTokenSchema =
  SchemaFactory.createForClass(MonitoredToken);
