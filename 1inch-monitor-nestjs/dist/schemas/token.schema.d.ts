/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/schemaoptions" />
import { Document } from 'mongoose';
export declare type TokenDocument = Token & Document;
export declare class Token {
    symbol: string;
    name: string;
    address: string;
    decimals: number;
    logoURI: number;
}
export declare const TokenSchema: import("mongoose").Schema<Document<Token, any, any>, import("mongoose").Model<Document<Token, any, any>, any, any, any>, {}, {}>;
