import { Model } from 'mongoose';
import { Token, TokenDocument } from 'src/schemas/token.schema';
export declare class TokensService {
    private tokenModel;
    constructor(tokenModel: Model<TokenDocument>);
    findAll(): Promise<Token[]>;
}
