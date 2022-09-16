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
const tokens_service_1 = require("../tokens/tokens.service");
const axios = require('axios').default;
let CrawlerService = class CrawlerService {
    constructor(schedulerRegistry, monitoredTokenService, tokensService) {
        this.schedulerRegistry = schedulerRegistry;
        this.monitoredTokenService = monitoredTokenService;
        this.tokensService = tokensService;
        this.chainId = 1;
        this.apiBaseUrl = 'https://api.1inch.io/v4.0/' + this.chainId;
    }
    async handleTimeout() {
        const saveQuote = async () => {
            const monitoredTokens = await this.monitoredTokenService.findAll();
            for (const iterator of monitoredTokens) {
                const token = await this.tokensService.findOne(iterator.baseUnit.toUpperCase());
                const quoteParams = {
                    fromTokenAddress: token.address,
                    toTokenAddress: iterator.tokenAddress,
                    amount: 1 * Math.pow(10, token.decimals),
                };
                let monitoredToken;
                try {
                    const quote = await this.fetchQuote(quoteParams);
                    monitoredToken = await this.monitoredTokenService.findOne(iterator.tokenName);
                    monitoredToken.lastPrice = monitoredToken.currentPrice * 1;
                    monitoredToken.currentPrice = parseFloat((quote.toTokenAmount * Math.pow(10, -monitoredToken.decimals)).toFixed(5)) * iterator.baseNumber;
                    monitoredToken.updateTime = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');
                }
                catch (err) {
                    monitoredToken = await this.monitoredTokenService.findOne(iterator.tokenName);
                    if (err.response) {
                        const data = err.response.data;
                        monitoredToken.errorMsg = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss') + '。' + JSON.stringify(data);
                    }
                    else {
                        monitoredToken.errorMsg = `${dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss')}。无法访问 1inch quote 接口。`;
                    }
                }
                await this.monitoredTokenService.update(iterator.tokenName, monitoredToken);
            }
        };
        saveQuote();
        const interval = setInterval(saveQuote, 20000);
        this.schedulerRegistry.addInterval('crawler', interval);
    }
    buildApiRequestUrl(methodName, queryParams = {}) {
        return (this.apiBaseUrl + methodName + '?' + new URLSearchParams(queryParams).toString());
    }
    async fetTokens() {
        const tokens = await axios(this.buildApiRequestUrl('/tokens'))
            .then((res) => {
            return res.data.tokens;
        });
        return tokens;
    }
    async fetchQuote(quoteParams) {
        const quote = await axios(this.buildApiRequestUrl('/quote', quoteParams))
            .then((res) => {
            return res.data;
        });
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
    __metadata("design:paramtypes", [schedule_1.SchedulerRegistry, monitored_token_service_1.MonitoredTokenService, tokens_service_1.TokensService])
], CrawlerService);
exports.CrawlerService = CrawlerService;
//# sourceMappingURL=crawler.service.js.map