"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const dayjs = require("dayjs");
const { exec } = require('node:child_process');
const app_module_1 = require("./app.module");
async function bootstrap() {
    const port = 3000;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.listen(port);
    console.log(`${dayjs().format('HH:mm:ss')}，监控服务已启动，请在 Chrome 浏览器中访问 http://localhost:${port}/views/deversi-fi/index.html 使用服务。`);
    console.log('爬虫服务启动较慢，大概在 30 秒后才能正常爬取数据，请耐心等待。');
    await exec(`start http://localhost:${port}/views/deversi-fi/index.html`);
}
bootstrap();
//# sourceMappingURL=main.js.map