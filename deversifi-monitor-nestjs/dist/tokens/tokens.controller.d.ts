import { TokensService } from './tokens.service';
export declare class TokensController {
    private readonly tokensService;
    constructor(tokensService: TokensService);
    findAll(): Promise<import("../schemas/token.schema").Token[]>;
}
