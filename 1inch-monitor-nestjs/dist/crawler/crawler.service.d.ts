import { SchedulerRegistry } from '@nestjs/schedule';
import { MonitoredTokenService } from 'src/monitored-token/monitored-token.service';
import { TokensService } from 'src/tokens/tokens.service';
export declare class CrawlerService {
    private schedulerRegistry;
    private readonly monitoredTokenService;
    private readonly tokensService;
    private chainId;
    private apiBaseUrl;
    constructor(schedulerRegistry: SchedulerRegistry, monitoredTokenService: MonitoredTokenService, tokensService: TokensService);
    handleTimeout(): Promise<void>;
    buildApiRequestUrl(methodName: any, queryParams?: {}): string;
    fetTokens(): Promise<any>;
    fetchQuote(quoteParams: any): Promise<any>;
}
