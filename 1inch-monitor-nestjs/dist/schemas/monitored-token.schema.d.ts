/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/schemaoptions" />
import { Document } from 'mongoose';
export declare type MonitoredTokenDocument = MonitoredToken & Document;
export declare class MonitoredToken {
    tokenName: string;
    tokenAddress: string;
    baseNumber: number;
    baseUnit: string;
    decimals: number;
    currentPrice: number;
    lastPrice: number;
    errorMsg: string;
    warningLowPrice: number;
    warningHighPrice: number;
    warningRange: number;
    warningTone: string;
    updateTime: string;
}
export declare const MonitoredTokenSchema: import("mongoose").Schema<Document<MonitoredToken, any, any>, import("mongoose").Model<Document<MonitoredToken, any, any>, any, any, any>, {}, {}>;
