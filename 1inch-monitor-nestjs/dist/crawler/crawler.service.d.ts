import { SchedulerRegistry } from '@nestjs/schedule';
import { MonitoredTokenService } from 'src/monitored-token/monitored-token.service';
export declare class CrawlerService {
    private schedulerRegistry;
    private readonly monitoredTokenService;
    private chainId;
    private apiBaseUrl;
    constructor(schedulerRegistry: SchedulerRegistry, monitoredTokenService: MonitoredTokenService);
    handleTimeout(): Promise<void>;
    saveQuote(): Promise<void>;
    buildApiRequestUrl(methodName: any, queryParams?: {}): string;
    fetTokens(): Promise<any>;
    fetchQuote(quoteParams: any): Promise<any>;
}
