import { Module } from '@nestjs/common';
import { MonitoredTokenService } from './monitored-token.service';
import { MonitoredTokenController } from './monitored-token.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MonitoredToken, MonitoredTokenSchema } from 'src/schemas/monitored-token.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: MonitoredToken.name, schema: MonitoredTokenSchema }])],
  controllers: [MonitoredTokenController],
  providers: [MonitoredTokenService],
  exports: [MonitoredTokenService]
})
export class MonitoredTokenModule {}
