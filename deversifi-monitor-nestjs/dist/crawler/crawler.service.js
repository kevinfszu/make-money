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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrawlerService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const dayjs = require("dayjs");
const puppeteer = require("puppeteer-core");
const monitored_token_service_1 = require("../monitored-token/monitored-token.service");
let CrawlerService = class CrawlerService {
    constructor(schedulerRegistry, monitoredTokenService) {
        this.schedulerRegistry = schedulerRegistry;
        this.monitoredTokenService = monitoredTokenService;
    }
    async handleTimeout() {
        const browser = await puppeteer.launch({
            channel: 'chrome',
            headless: false,
            defaultViewport: null,
            args: ['--start-maximized'],
        });
        const pages = await browser.pages();
        const page = pages[0];
        await page.goto(`https://app.rhino.fi/swap`);
        await page.reload();
        await this.wait(() => { }, 1000);
        console.log(111);
        await page.waitForSelector('.userflowjs-bubble', { visible: true, timeout: 0 });
        await page.evaluate(() => {
            document.querySelector('.userflowjs-bubble').remove();
            document.querySelector('#userflow-ui > div > div.userflowjs-modal-backdrop.userflowjs-modal-backdrop--visible').remove();
        });
        await page.click('#root > div > div.sc-eCFVrV.fspGFM > div:nth-child(2) > div:nth-child(5) > div.sc-kTqLtj.dyaijd > button');
        console.log(333);
        this.getData(page, this.wait, this.monitoredTokenService);
        const interval = setInterval(this.getData, 30000, page, this.wait, this.monitoredTokenService);
        this.schedulerRegistry.addInterval('crawler', interval);
    }
    async getData(page, wait, monitoredTokenService) {
        var e_1, _a;
        const monitoredTokens = await monitoredTokenService.findAll();
        const ETH_NUM = '0.1';
        try {
            for (var monitoredTokens_1 = __asyncValues(monitoredTokens), monitoredTokens_1_1; monitoredTokens_1_1 = await monitoredTokens_1.next(), !monitoredTokens_1_1.done;) {
                const iterator = monitoredTokens_1_1.value;
                console.log('打开币种选择弹层。');
                await page.waitForSelector('#root > div > div.sc-eCFVrV.fspGFM > div:nth-child(2) > div.sc-fItasp.dWiSPW.fade-in-animation > div > div > div.sc-gWXbKe.cXcOfR > div > form > div:nth-child(1) > div:nth-child(1) > div > div.sc-khQegj.hAmNqO.input-wrapper > div.sc-jgrJph.iGtnpe > button', { visible: true, timeout: 0 });
                await page.click('#root > div > div.sc-eCFVrV.fspGFM > div:nth-child(2) > div.sc-fItasp.dWiSPW.fade-in-animation > div > div > div.sc-gWXbKe.cXcOfR > div > form > div:nth-child(1) > div:nth-child(1) > div > div.sc-khQegj.hAmNqO.input-wrapper > div.sc-jgrJph.iGtnpe > button');
                console.log('输入 tokenName 进行搜索。');
                await page.waitForSelector('input[name="search-token"]', {
                    visible: true,
                    timeout: 0,
                });
                await page.click('input[name="search-token"]');
                await page.keyboard.down('Control');
                await page.keyboard.press('A');
                await page.keyboard.up('Control');
                await page.keyboard.press('Backspace');
                await page.type('input[name="search-token"]', iterator.tokenName, {
                    delay: 15,
                });
                console.log('下拉列表选择“币种”。');
                await page.waitForSelector('form ul .simplebar-content > div > div:nth-child(3)', { visible: true, timeout: 0 });
                await page.click('form ul .simplebar-content > div > div:nth-child(3)');
                console.log('填写 ETH 数量。');
                await page.waitForSelector('input[name="payAmount"]', {
                    visible: true,
                    timeout: 0,
                });
                await wait(() => { }, 1000);
                await page.click('input[name="payAmount"]');
                await page.keyboard.down('Control');
                await page.keyboard.press('A');
                await page.keyboard.up('Control');
                await page.keyboard.press('Backspace');
                await page.type('input[name="payAmount"]', ETH_NUM);
                await wait(() => { }, 2000);
                await page.waitForFunction('document.querySelector("input[name=receiveAmount]").value !== "0"', { polling: 500, timeout: 0 });
                const currentPrice = await page.evaluate(() => {
                    return document
                        .querySelector('input[name="receiveAmount"]')
                        .getAttribute('value');
                });
                const monitoredToken = await monitoredTokenService.findOne(iterator.tokenName);
                monitoredToken.lastPrice = monitoredToken.currentPrice;
                monitoredToken.currentPrice = parseFloat(currentPrice);
                monitoredToken.updateTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
                await monitoredTokenService.update(iterator.tokenName, monitoredToken);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (monitoredTokens_1_1 && !monitoredTokens_1_1.done && (_a = monitoredTokens_1.return)) await _a.call(monitoredTokens_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    async wait(callback, ms, ...params) {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                await callback(params);
                resolve(ms);
            }, ms, params);
        });
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
    __metadata("design:paramtypes", [schedule_1.SchedulerRegistry,
        monitored_token_service_1.MonitoredTokenService])
], CrawlerService);
exports.CrawlerService = CrawlerService;
//# sourceMappingURL=crawler.service.js.map