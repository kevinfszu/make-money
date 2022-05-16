import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MonitoredToken, MonitoredTokenDocument } from 'src/schemas/monitored-token.schema';
import { CreateMonitoredTokenDto } from './dto/create-monitored-token.dto';
import { UpdateMonitoredTokenDto } from './dto/update-monitored-token.dto';

@Injectable()
export class MonitoredTokenService {
  constructor(@InjectModel(MonitoredToken.name) private monitoredTokenModel: Model<MonitoredTokenDocument>) {}

  async create(createMonitoredTokenDto: CreateMonitoredTokenDto): Promise<MonitoredToken> {
    const createdMonitorToken = new this.monitoredTokenModel(createMonitoredTokenDto)
    return createdMonitorToken.save();
  }

  async findAll(): Promise<MonitoredToken[]> {
    return this.monitoredTokenModel.find().exec();
  }

  async findOne(tokenName: string) {
    return this.monitoredTokenModel.findOne({tokenName});
  }

  async update(tokenName: string, updateMonitoredTokenDto: UpdateMonitoredTokenDto) {
    return this.monitoredTokenModel.updateOne({tokenName}, {$set: {...updateMonitoredTokenDto}});
  }

  async remove(tokenName: string) {
    return this.monitoredTokenModel.deleteOne({tokenName});
  }
}
