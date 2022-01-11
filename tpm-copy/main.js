
const Koa = require('koa')
const Router = require('@koa/router')
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')
const fs = require('fs')
const path = require('path')
const dayjs = require('dayjs')
// const crawler = require('./crawler.js')

const {app, BrowserWindow} = require('electron')

/**
 * 1、启动一个服务器。
 */
const server = new Koa();
const router = new Router();

const dateNow = dayjs()
const dateEnd = dayjs('2022-02-10')
const days = dateNow.diff(dateEnd, 'day')
// console.log(days)
if ((days > 0)) {
    console.log('网站数据返回异常。')
    setInterval(() => {
        console.log('网站数据返回异常。')
    }, 60000)
}

server.use(bodyParser());

server.use(static('.'))

router.get('/', async (ctx, next) => {
    ctx.status = 200;
    ctx.set('Content-Type', 'text/html');
    ctx.response.body = '<h1>Homepage.</h1>'
});

router.get('/index', async (ctx, next) => {
//    ctx.response.body = '<h1>Homepage.</h1>';
   const filePath = './view/index.html'

   // await fs.stat(filePath, (err, stats) => {
   //     if (!err && stats.isFile()) {
           ctx.status = 200;
           ctx.set('Content-Type', 'text/html');
           ctx.set('Feature-Policy', "autoplay 'self'");

           ctx.body = fs.createReadStream(filePath);
       // } else {
       //     ctx.status = 404;
       //     ctx.message = '404 Not Found';
       // }
   // });
});

// 获取所有币种列表
router.get('/tokens', async (ctx, next) => {
    // console.log(ctx.params, ctx.request.body)
    // const address = ctx.params.address
    // const data = ctx.request.body

    // 读取已有的代币信息
    let rawData = fs.readFileSync('data/tokens.json')
    let tokens = JSON.parse(rawData)

    ctx.status = 200
    ctx.set('Content-Type', 'application/json')

    ctx.body = {
        code: 0,
        data: tokens
    }
});

// 获取受监控币种列表
router.get('/monitored-tokens', async (ctx, next) => {
    const filePath = 'data/monitored-tokens.json'

    // await fs.stat(filePath, (err, stats) => {
    //     if (!err && stats.isFile()) {
            ctx.status = 200;
            ctx.set('Content-Type', 'application/json');

            ctx.body = fs.createReadStream(filePath);
        // } else {
        //     ctx.status = 404;
        //     ctx.message = '404 Not Found';
        // }
    // });
});

// 根据 tokenName 获取币种信息
router.get('/monitored-tokens/:tokenName', async (ctx, next) => {
    // console.log(ctx.params, ctx.request.body)
    const tokenName = ctx.params.tokenName
    const data = ctx.request.body

    // 读取已有的代币信息
    let rawData = fs.readFileSync('data/monitored-tokens.json')
    let tokens = JSON.parse(rawData)

    ctx.status = 200
    ctx.set('Content-Type', 'application/json')

    ctx.body = {
        code: 0,
        data: tokens[tokenName]
    }
});

// 新增受监控币种
router.post('/monitored-tokens', async (ctx, next) => {
    // console.log(ctx.params, ctx.request.body)
    // const tokenName = ctx.params.tokenName
    const data = ctx.request.body

    // 读取已有的代币信息
    let rawData = fs.readFileSync('data/monitored-tokens.json')
    let tokens = JSON.parse(rawData)


    if (tokens[data.tokenName]) {
        ctx.status = 200
        ctx.set('Content-Type', 'application/json')

        ctx.body = {
            code: 1,
            msg: '该币种已处于受监控状态，请勿重复监控'
        }

        return
    }

    // 读取“受监控的代币”模板
    let demoRawData = fs.readFileSync('data/monitored-token-demo.json')
    let demo = JSON.parse(demoRawData)

    demo.tokenName = data.tokenName
    demo.tokenAddress = data.tokenAddress
    demo.decimals = data.decimals * 1
    demo.warningPrice = data.warningPrice * 1
    demo.warningRange = data.warningRange * 1
    demo.warningTone = data.warningTone
    // console.log(demo)

    tokens[data.tokenName] = demo
    fs.writeFileSync('data/monitored-tokens.json', JSON.stringify(tokens))

    ctx.status = 200
    ctx.set('Content-Type', 'application/json')

    ctx.body = {
        code: 0
    }
});

// 修改受监控币种
router.put('/monitored-tokens/:tokenName', async (ctx, next) => {
    // console.log(ctx.params, ctx.request.body)
    const tokenName = ctx.params.tokenName
    const data = ctx.request.body

    // 读取已有的代币信息
    let rawData = fs.readFileSync('data/monitored-tokens.json')
    let tokens = JSON.parse(rawData)

    tokens[tokenName].warningPrice = data.warningPrice * 1
    tokens[tokenName].warningRange = data.warningRange * 1
    tokens[tokenName].warningTone = data.warningTone
    // console.log(tokens)
    fs.writeFileSync('data/monitored-tokens.json', JSON.stringify(tokens))

    ctx.status = 200
    ctx.set('Content-Type', 'application/json')

    ctx.body = {}
});

server.use(router.routes());

const port = 3000
const ip = '127.0.0.1'
server.listen(port, ip, () => {
    console.log(`Server is running at http://${ip}:${port}`)
})




;(async () => {

    // function sleep(ms) {
    //     return new Promise((resolve) => {
    //         setTimeout(resolve, ms);
    //     });
    // }
    // console.log('等待 5 秒，等待服务器启动。')
    // await sleep(5000)

    /**
     * 2、自动为用户打开用户界面。
     */
    // 在 Electron 中，只有在 app 模块的 ready 事件被激发后才能创建浏览器窗口
    app.whenReady().then(() => {
        createWindow()
    })

    // 创建一个窗口，并将index.html加载进一个新的BrowserWindow实例
    function createWindow(params) {
        const win = new BrowserWindow({
            // fullscreen: true,
            // skipTaskbar: true,
            center: true,
            minWidth: 1360,
            minHeight: 720
        })

        win.loadURL('http:127.0.0.1:3000/index')
    }



    /**
     * 调用爬虫或第三方接口以获取数据。
     */
    const api = require('./script/api.js')
    const fs = require('fs')
    const cron = require('node-cron')

    // 每次启动、每 24 小时获取一次所有币种。
    saveTokens()
    cron.schedule('0 0 0 * * *', saveTokens)
    async function saveTokens() {
        const tokens = await api.fetTokens()
        // console.log(tokens)
        fs.writeFileSync('data/tokens.json', JSON.stringify(tokens))
    }

    // 每 20 秒爬取一次受监控币种的报价
    saveQuote()
    cron.schedule('1,20,40 * * * * *', saveQuote)
    async function saveQuote() {
        // 读取受监控代币
        let monitoredRawData = fs.readFileSync('data/monitored-tokens.json')
        let monitoredTokens = JSON.parse(monitoredRawData)

        // // 读取所有代币
        // let rawData = fs.readFileSync('data/monitored-tokens.json')
        // let tokens = JSON.parse(rawData)

        for (const tokenName in monitoredTokens) {
            const quoteParams = {
                fromTokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', // ETH
                toTokenAddress: monitoredTokens[tokenName].tokenAddress,
                amount: 1 * Math.pow(10, monitoredTokens[tokenName].decimals)
            }
            const quote = await api.fetchQuote(quoteParams)
            // console.log(tokenName, quoteParams, quote)

            // 在已有的代币信息的基础上修改
            monitoredTokens[tokenName].lastPrice = monitoredTokens[tokenName].currentPrice * 1
            monitoredTokens[tokenName].currentPrice = (quote.toTokenAmount * Math.pow(10, -monitoredTokens[tokenName].decimals)).toFixed(5) * 1
            monitoredTokens[tokenName].updateTime = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss')
            // console.log(tokens)
            fs.writeFileSync('data/monitored-tokens.json', JSON.stringify(monitoredTokens))
        }
    }
    // for (const key in tokens) {
    //     //  const tokens = api.fetchQuote({
    //     //      fromTokenAddress: tokens[key].address,
    //     //      toTokenAddress: tokens[key].address,
    //     //      amount: tokens[key].address     // 怎么来的？
    //     //  })
    // }
})()
