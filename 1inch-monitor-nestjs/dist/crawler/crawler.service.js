"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrawlerService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const dayjs = require("dayjs");
const monitored_token_service_1 = require("../monitored-token/monitored-token.service");
const axios = require('axios').default;
let CrawlerService = class CrawlerService {
    constructor(schedulerRegistry, monitoredTokenService) {
        this.schedulerRegistry = schedulerRegistry;
        this.monitoredTokenService = monitoredTokenService;
        this.chainId = 1;
        this.apiBaseUrl = 'https://api.1inch.io/v4.0/' + this.chainId;
    }
    async handleTimeout() {
        this.saveQuote(this.monitoredTokenService, this.fetchQuote);
        const interval = setInterval(this.saveQuote, 20000, this.monitoredTokenService, this.fetchQuote);
        this.schedulerRegistry.addInterval('crawler', interval);
    }
    async saveQuote(monitoredTokenService, fetchQuote) {
        const monitoredTokens = await monitoredTokenService.findAll();
        for (const monitoredToken of monitoredTokens) {
            const quoteParams = {
                fromTokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
                toTokenAddress: monitoredToken.tokenAddress,
                amount: 1 * Math.pow(10, 18),
            };
            try {
                const quote = await fetchQuote(quoteParams);
                console.log(monitoredToken.tokenName, quoteParams, quote);
                monitoredToken.lastPrice = monitoredToken.currentPrice * 1;
                monitoredToken.currentPrice = 222;
                monitoredToken.updateTime = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');
            }
            catch (err) {
                if (err.response) {
                    const data = err.response.data;
                    monitoredToken.errorMsg =
                        dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss') + '。' + JSON.stringify(data);
                }
                else {
                    monitoredToken.errorMsg = `${dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss')}。无法访问 1inch quote 接口。`;
                }
            }
            await monitoredTokenService.update(monitoredToken.tokenName, monitoredToken);
            console.log(`${dayjs().format('HH:mm:ss')}, ${monitoredToken.tokenName} currentPrice: ${monitoredToken.currentPrice}`);
        }
    }
    buildApiRequestUrl(methodName, queryParams = {}) {
        return (this.apiBaseUrl + methodName + '?' + new URLSearchParams(queryParams).toString());
    }
    async fetTokens() {
        const tokens = await axios(this.buildApiRequestUrl('/tokens')).then((res) => {
            return res.data.tokens;
        });
        return tokens;
    }
    async fetchQuote(quoteParams) {
        const quote = await axios(this.buildApiRequestUrl('/quote', quoteParams))
            .then((res) => {
            return res.data;
        });
        console.log('quote api: ', quote);
        return quote;
    }
};
__decorate([
    (0, schedule_1.Timeout)(1000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CrawlerService.prototype, "handleTimeout", null);
CrawlerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [schedule_1.SchedulerRegistry, monitored_token_service_1.MonitoredTokenService])
], CrawlerService);
exports.CrawlerService = CrawlerService;
//# sourceMappingURL=crawler.service.js.map