import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as dayjs from 'dayjs';
const { exec } = require('node:child_process');
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3001);

  console.log(`${dayjs().format('HH:mm:ss')}，监控服务已启动，请在 Chrome 浏览器中访问 http://localhost:3001/views/deversi-fi/index.html 使用服务。`)
  console.log('爬虫服务启动较慢，大概在 30 秒后才能正常爬取数据，请耐心等待。')

  await exec('start http://localhost:3001/views/deversi-fi/index.html')
}
bootstrap();
