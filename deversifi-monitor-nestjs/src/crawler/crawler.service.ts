import { Inject, Injectable } from "@nestjs/common";
import { Cron, Interval, SchedulerRegistry, Timeout } from "@nestjs/schedule";
import * as dayjs from 'dayjs';
import * as puppeteer from 'puppeteer-core';
import { MonitoredTokenService } from "src/monitored-token/monitored-token.service";

@Injectable()
export class CrawlerService {

  constructor(private schedulerRegistry: SchedulerRegistry, private readonly monitoredTokenService: MonitoredTokenService) { }

  @Timeout(1000)
  async handleTimeout() {
    const browser = await puppeteer.launch({
      executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
      // channel: 'chrome',
      // headless: false,
      defaultViewport: null,
      args: ['--start-maximized']
    })
    const pages = await browser.pages()
    const page = pages[0]

    await page.goto(`https://app.deversifi.com/swap`)
    await page.waitForSelector('body > div.sc-ilfuhL.dVdrgf.modal-transition-appear-done.modal-transition-enter-done > div.sc-jHkVzv.lnYvuo > div > div > div.sc-xiLah.cFakQg', { visible: true, timeout: 15000 })
    await page.click('body > div.sc-ilfuhL.dVdrgf.modal-transition-appear-done.modal-transition-enter-done > div.sc-jHkVzv.lnYvuo > div > div > div.sc-xiLah.cFakQg')
    // console.log('已关闭弹层。')

    // const callback = () => {
    //   // this.logger.warn(`Interval ${name} executing at time (${milliseconds})!`);
    //   console.log(`Interval!`)
    // };

    this.getData(page, this.wait, this.monitoredTokenService)
    const interval = setInterval(this.getData, 30000, page, this.wait, this.monitoredTokenService);
    this.schedulerRegistry.addInterval('crawler', interval);
  }



  async getData(page, wait, monitoredTokenService) {
    const monitoredTokens = await monitoredTokenService.findAll()
    // console.log(`monitoredTokens: ${monitoredTokens}`)

    const ETH_NUM: string = '0.1'   // 用几个 ETH 兑换指定的币种
    for await (const iterator of monitoredTokens) {
      // console.log(iterator.tokenName)

      // console.log('打开币种选择弹层。')
      // await wait(() => { }, 1000)
      await page.waitForSelector('#root > div > div > div.sc-ePIFMk.YITkK > div:nth-child(2) > div.sc-LMKsT.egNPPS.fade-in-animation > div > div > div.sc-jJoQJp.pZXOF > div > form > div:nth-child(1) > div:nth-child(3) > div > div.sc-bBHHxi.ghSboO.input-wrapper > div.sc-AjmGg.eCTxfx > button', { visible: true, timeout: 0 })
      await page.click('#root > div > div > div.sc-ePIFMk.YITkK > div:nth-child(2) > div.sc-LMKsT.egNPPS.fade-in-animation > div > div > div.sc-jJoQJp.pZXOF > div > form > div:nth-child(1) > div:nth-child(3) > div > div.sc-bBHHxi.ghSboO.input-wrapper > div.sc-AjmGg.eCTxfx > button')

      // console.log('输入 tokenName 进行搜索。')
      // await wait(() => { }, 1000)
      await page.waitForSelector('input[name="search-token"]', { visible: true, timeout: 0 })
      await page.click('input[name="search-token"]')
      await page.keyboard.down('Control')
      await page.keyboard.press('A')
      await page.keyboard.up('Control')
      await page.keyboard.press('Backspace')      // 全选并删除输入框中的内容
      await page.type('input[name="search-token"]', iterator.tokenName, { delay: 30 })

      // console.log('下拉列表选择“币种”。')
      // await wait(() => { }, 1000)
      await page.waitForSelector('ul .sc-jeraig .simplebar-wrapper div.sc-hOGkXu:nth-child(4)', { visible: true, timeout: 0 })
      await page.click('ul .sc-jeraig .simplebar-wrapper div.sc-hOGkXu:nth-child(4)')

      // console.log('填写 ETH 数量。')
      // await wait(() => { }, 1000)
      await page.waitForSelector('input[name="payAmount"]', { visible: true, timeout: 0 })
      await page.click('input[name="payAmount"]')
      await page.keyboard.down('Control')
      await page.keyboard.press('A')
      await page.keyboard.up('Control')
      await page.keyboard.press('Backspace')      // 全选并删除输入框中的内容
      await page.type('input[name="payAmount"]', ETH_NUM)

      // console.log('读取指定币种的价格。')
      await wait(() => { }, 2000)
      await page.waitForFunction('document.querySelector("input[name=receiveAmount]").value !== "0"', { polling: 500, timeout: 0 })
      // const currentPrice = await page.$eval('input[name="receiveAmount"]', (ele) => {
      //   return ele.getAttribute('value')
      // })
      const currentPrice = await page.evaluate(() => {
        return document.querySelector('input[name="receiveAmount"]').getAttribute('value')
      })

      // console.log('写入数据库。')
      const monitoredToken = await monitoredTokenService.findOne(iterator.tokenName)
      monitoredToken.lastPrice = monitoredToken.currentPrice
      monitoredToken.currentPrice = parseFloat(currentPrice)
      monitoredToken.updateTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
      // monitoredToken.errorMsg = ''
      await monitoredTokenService.update(iterator.tokenName, monitoredToken)

      // console.log(`${dayjs().format('HH:mm:ss')}, ${iterator.tokenName} currentPrice: ${currentPrice}`)
    }
  }

  async wait(callback, ms, ...params) {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        await callback(params)
        resolve(ms)
      }, ms, params)
    })
  }
}
