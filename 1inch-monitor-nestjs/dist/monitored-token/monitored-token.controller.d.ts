/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose" />
import { MonitoredTokenService } from './monitored-token.service';
import { CreateMonitoredTokenDto } from './dto/create-monitored-token.dto';
import { UpdateMonitoredTokenDto } from './dto/update-monitored-token.dto';
export declare class MonitoredTokenController {
    private readonly monitoredTokenService;
    constructor(monitoredTokenService: MonitoredTokenService);
    create(createMonitoredTokenDto: CreateMonitoredTokenDto): Promise<import("../schemas/monitored-token.schema").MonitoredToken>;
    findAll(): Promise<import("../schemas/monitored-token.schema").MonitoredToken[]>;
    findOne(tokenName: string): Promise<import("../schemas/monitored-token.schema").MonitoredToken & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    update(tokenName: string, updateMonitoredTokenDto: UpdateMonitoredTokenDto): Promise<import("mongodb").UpdateResult>;
    remove(tokenName: string): Promise<import("mongodb").DeleteResult>;
}
