import { SchedulerRegistry } from "@nestjs/schedule";
import { MonitoredTokenService } from "src/monitored-token/monitored-token.service";
export declare class CrawlerService {
    private schedulerRegistry;
    private readonly monitoredTokenService;
    constructor(schedulerRegistry: SchedulerRegistry, monitoredTokenService: MonitoredTokenService);
    handleTimeout(): Promise<void>;
    getData(page: any, wait: any, monitoredTokenService: any): Promise<void>;
    wait(callback: any, ms: any, ...params: any[]): Promise<unknown>;
}
