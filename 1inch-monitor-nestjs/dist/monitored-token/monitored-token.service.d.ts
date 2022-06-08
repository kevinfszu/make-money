/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/schemaoptions" />
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
