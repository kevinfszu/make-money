import { Inject, Injectable } from '@nestjs/common';
import { Cron, Interval, SchedulerRegistry, Timeout } from '@nestjs/schedule';
import * as dayjs from 'dayjs';
// import * as puppeteer from 'puppeteer-core';
import { MonitoredTokenService } from 'src/monitored-token/monitored-token.service';
const axios = require('axios').default;
const tunnel = require('tunnel')

// const tunnelProxy = tunnel.httpsOverHttp({
//     proxy: {
//         host: '127.0.0.1',
//         port: '58591'
//     }
// })

// // 修改 axios 全局配置。（可以在实例中配置覆盖此全局配置）
// axios.defaults.proxy = false
// axios.defaults.httpsAgent = tunnelProxy

@Injectable()
export class CrawlerService {
  private chainId;
  private apiBaseUrl;

  constructor(private schedulerRegistry: SchedulerRegistry, private readonly monitoredTokenService: MonitoredTokenService) {
    this.chainId = 1; // 区块链 ID。详见：https://chainlist.org/
    this.apiBaseUrl = 'https://api.1inch.io/v4.0/' + this.chainId;
  }

  @Timeout(1000)
  async handleTimeout() {

  // const saveQuote = async (monitoredTokenService, fetchQuote) => {
  const saveQuote = async () => {
    // 读取受监控代币
    const monitoredTokens = await this.monitoredTokenService.findAll();

    for (const monitoredToken of monitoredTokens) {
      const quoteParams = {
        fromTokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', // ETH
        toTokenAddress: monitoredToken.tokenAddress,
        amount: 1 * Math.pow(10, 18), // 基于 ETH 的精度（即 18）
      };

      try {
        const quote = await this.fetchQuote(quoteParams)
        // console.log(monitoredToken.tokenName, quoteParams, quote)

        // 在已有的代币信息的基础上修改
        monitoredToken.lastPrice = monitoredToken.currentPrice * 1;
        monitoredToken.currentPrice = parseFloat((quote.toTokenAmount * Math.pow(10, -monitoredToken.decimals)).toFixed(5));
        monitoredToken.updateTime = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');
      } catch (err) {
        console.log(err)
        if (err.response) {
          const data = err.response.data;
          // monitoredToken.error = `${data.statusCode}, ${data.description}`
          monitoredToken.errorMsg = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss') + '。' + JSON.stringify(data);
        } else {
          // monitoredToken.error = `无法访问：${err.config.url}`
          monitoredToken.errorMsg = `${dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss', )}。无法访问 1inch quote 接口。`;
        }
      }

      await this.monitoredTokenService.update(monitoredToken.tokenName, monitoredToken);
      // console.log(`${dayjs().format('HH:mm:ss')}, ${monitoredToken.tokenName} currentPrice: ${monitoredToken.currentPrice}`)
    }
  }

    // saveQuote(this.monitoredTokenService, this.fetchQuote);
    saveQuote();
    // const interval = setInterval(saveQuote, 20000, this.monitoredTokenService, this.fetchQuote);
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
  // fetTokens()     // FIXME: 用于测试

  async fetchQuote(quoteParams) {
    // const quoteParams = {
    //     fromTokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', // ETH
    //     toTokenAddress: '0x5a98fcbea516cf06857215779fd812ca3bef1b32', // LDO
    //     amount: '1000000000000000000'
    // }

    // interface Quote = {
    //   fromToken: Object,
    //   toToken: Object,
    //   toTokenAmount: String
    // }

    const quote = await axios(this.buildApiRequestUrl('/quote', quoteParams))
      // .then(res => res.json())
      .then((res) => {
        // console.log(res.data)
        return res.data;
      });
    // .catch((err) => {
    //     console.log('获取最佳报价出错。', quoteParams, err)
    // })
    // console.log('quote api: ', quote)

    return quote;
  }
  // fetchQuote({
  //     fromTokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', // ETH
  //     toTokenAddress: '0x5a98fcbea516cf06857215779fd812ca3bef1b32', // LDO
  //     amount: '1000000000000000000'
  // })     // FIXME: 用于测试

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
