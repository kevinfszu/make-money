import { Module } from '@nestjs/common';
import { MonitoredTokenModule } from 'src/monitored-token/monitored-token.module';
import { TokensModule } from 'src/tokens/tokens.module';
import { CrawlerService } from './crawler.service';

@Module({
    imports: [MonitoredTokenModule, TokensModule],
    providers: [CrawlerService]
})
export class CrawlerModule {}
