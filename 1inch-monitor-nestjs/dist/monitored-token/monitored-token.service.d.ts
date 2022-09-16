import { Model } from 'mongoose';
import { MonitoredToken, MonitoredTokenDocument } from 'src/schemas/monitored-token.schema';
import { CreateMonitoredTokenDto } from './dto/create-monitored-token.dto';
import { UpdateMonitoredTokenDto } from './dto/update-monitored-token.dto';
export declare class MonitoredTokenService {
    private monitoredTokenModel;
    constructor(monitoredTokenModel: Model<MonitoredTokenDocument>);
    create(createMonitoredTokenDto: CreateMonitoredTokenDto): Promise<MonitoredToken>;
    findAll(): Promise<MonitoredToken[]>;
    findOne(tokenName: string): Promise<MonitoredToken & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    update(tokenName: string, updateMonitoredTokenDto: UpdateMonitoredTokenDto): Promise<import("mongodb").UpdateResult>;
    remove(tokenName: string): Promise<import("mongodb").DeleteResult>;
}
