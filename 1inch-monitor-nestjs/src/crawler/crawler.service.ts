import { Inject, Injectable } from '@nestjs/common';
import { Cron, Interval, SchedulerRegistry, Timeout } from '@nestjs/schedule';
import * as dayjs from 'dayjs';
// import * as puppeteer from 'puppeteer-core';
import { MonitoredTokenService } from 'src/monitored-token/monitored-token.service';
import { MonitoredToken } from 'src/schemas/monitored-token.schema';
import { TokensService } from 'src/tokens/tokens.service';
const axios = require('axios').default;

@Injectable()
export class CrawlerService {
  private chainId;
  private apiBaseUrl;

  constructor(private schedulerRegistry: SchedulerRegistry, private readonly monitoredTokenService: MonitoredTokenService, private readonly tokensService: TokensService) {
    this.chainId = 1; // 区块链 ID。详见：https://chainlist.org/
    this.apiBaseUrl = 'https://api.1inch.io/v4.0/' + this.chainId;
  }

  @Timeout(1000)
  async handleTimeout() {

  const saveQuote = async () => {
    // 读取受监控代币
    const monitoredTokens = await this.monitoredTokenService.findAll();

    for (const iterator of monitoredTokens) {
      const token = await this.tokensService.findOne(iterator.baseUnit.toUpperCase());
      const quoteParams = {
        // fromTokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', // ETH
        fromTokenAddress: token.address, // ETH
        toTokenAddress: iterator.tokenAddress,
        amount: 1 * Math.pow(10, token.decimals), // 基于 ETH 的精度（即 18）
      };

      let monitoredToken: MonitoredToken
      try {
        const quote = await this.fetchQuote(quoteParams)
        // console.log(iterator.tokenName, quoteParams, quote)

        // 在已有的代币信息的基础上修改
        monitoredToken = await this.monitoredTokenService.findOne(iterator.tokenName);    // 将读取并修改本地数据库的操作放在延迟性较高的 fetchQuote 后面，避免与页面的 edit 模块冲突。
        monitoredToken.lastPrice = monitoredToken.currentPrice * 1;
        monitoredToken.currentPrice = parseFloat((quote.toTokenAmount * Math.pow(10, -monitoredToken.decimals)).toFixed(5)) * iterator.baseNumber;
        monitoredToken.updateTime = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');
      } catch (err) {
        // console.log(err)
        // 在已有的代币信息的基础上修改
        monitoredToken = await this.monitoredTokenService.findOne(iterator.tokenName);

        if (err.response) {
          const data = err.response.data;
          // monitoredToken.error = `${data.statusCode}, ${data.description}`
          monitoredToken.errorMsg = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss') + '。' + JSON.stringify(data);
        } else {
          // monitoredToken.error = `无法访问：${err.config.url}`
          monitoredToken.errorMsg = `${dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss', )}。无法访问 1inch quote 接口。`;
        }
      }

      await this.monitoredTokenService.update(iterator.tokenName, monitoredToken);
      // console.log(`${dayjs().format('HH:mm:ss')}, ${monitoredToken.tokenName} currentPrice: ${monitoredToken.currentPrice}`)
    }
  }

    saveQuote();
    const interval = setInterval(saveQuote, 20000);
    this.schedulerRegistry.addInterval('crawler', interval);
  }

  buildApiRequestUrl(methodName, queryParams = {}) {
    return (
      this.apiBaseUrl + methodName + '?' + new URLSearchParams(queryParams).toString()
    );
  }

  async fetTokens() {
    const tokens = await axios(this.buildApiRequestUrl('/tokens'))
      .then((res) => {
        // console.log(res.data)
        return res.data.tokens;
      },
    );

    // console.log(tokens)
    return tokens;
  }

  async fetchQuote(quoteParams) {

    const quote = await axios(this.buildApiRequestUrl('/quote', quoteParams))
      .then((res) => {
        // console.log(res.data)
        return res.data;
      });

    return quote;
  }

  // async wait(callback, ms, ...params) {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(
  //       async () => {
  //         await callback(params);
  //         resolve(ms);
  //       },
  //       ms,
  //       params,
  //     );
  //   });
  // }
}
