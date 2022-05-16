import { Module } from '@nestjs/common';
import { MonitoredTokenModule } from 'src/monitored-token/monitored-token.module';
import { CrawlerService } from './crawler.service';

@Module({
    imports: [MonitoredTokenModule],
    providers: [CrawlerService]
})
export class CrawlerModule {}
