"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const mongoose_1 = require("@nestjs/mongoose");
const monitored_token_module_1 = require("./monitored-token/monitored-token.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const tokens_module_1 = require("./tokens/tokens.module");
const schedule_1 = require("@nestjs/schedule");
const crawler_module_1 = require("./crawler/crawler.module");
const monitored_token_controller_1 = require("./monitored-token/monitored-token.controller");
const warn_controller_1 = require("./warn/warn.controller");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot('mongodb://localhost:27017/1inch-monitor'),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'client'),
                renderPath: 'views',
                serveRoot: ''
            }),
            schedule_1.ScheduleModule.forRoot(),
            monitored_token_module_1.MonitoredTokenModule,
            tokens_module_1.TokensModule,
            crawler_module_1.CrawlerModule
        ],
        controllers: [app_controller_1.AppController, monitored_token_controller_1.MonitoredTokenController, warn_controller_1.WarnController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map