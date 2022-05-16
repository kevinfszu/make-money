import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
// import * as dayjs from 'dayjs';

export type TokenDocument = Token & Document;

@Schema()
export class Token {
  @Prop()
  symbol: string;

  @Prop()
  name: string;

  @Prop()
  address: string;

  @Prop()
  decimals: number;

  @Prop()
  logoURI: number;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
