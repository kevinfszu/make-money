import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MonitoredTokenModule } from './monitored-token/monitored-token.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TokensModule } from './tokens/tokens.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CrawlerService } from './crawler/crawler.service';
import { MonitoredTokenService } from './monitored-token/monitored-token.service';
import { CrawlerModule } from './crawler/crawler.module';
import { MonitoredTokenController } from './monitored-token/monitored-token.controller';
import { WarnController } from './warn/warn.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/monitor'),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      renderPath: 'views',
      serveRoot: ''
    }),
    ScheduleModule.forRoot(),
    MonitoredTokenModule,
    TokensModule,
    CrawlerModule
  ],
  controllers: [AppController, MonitoredTokenController, WarnController],
  providers: [AppService],
})
export class AppModule { }
