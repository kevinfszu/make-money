const axios = require('axios')
const tunnel = require('tunnel')
const fs = require('fs')
const path = require('path')
const os = require('os')

const tunnelProxy = tunnel.httpsOverHttp({
    proxy: {
        host: '127.0.0.1',
        port: '58591'
    }
})

// 修改 axios 全局配置。（可以在实例中配置覆盖此全局配置）
axios.defaults.proxy = false
axios.defaults.httpsAgent = tunnelProxy

async function makeRequest() {
    const params = {
        symbol: 'ETH:DAI',
    }
    let url = `https://api.deversifi.com/v1/trading/r/getConf`
    // let url = `https://api.stg.deversifi.com/market-data/tickers?symbols=${params.symbol}`
    // let url = `https://api.stg.deversifi.com/market-data/ticker/${params.symbol}`


    const response = await axios(url, {
        // FIXME: 这种代理方案在访问 https 协议的 URL 时，可能会出现“404”报错（奇怪，测试 twitter.com 之类的都有问题，测试 baidu.com 或 google.com 又没问题）。
        // proxy: {
        //     protocol: 'socks5',
        //     host: '127.0.0.1',
        //     port: 51837
        // },
        // proxy: {
        //     protocol: 'http',
        //     host: '127.0.0.1',
        //     port: 58591
        // },

        // 此方案替换 axios 有问题的 proxy 方案。
        // proxy: false,
        // httpsAgent: tunnelProxy,
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })

    return response.data
}


async function makeRequest3() {
    const params = {
        symbol: 'DVF:ETH',
    }
    // let url = `https://api.deversifi.com/v1/trading/r/getConf`
    // let url = `https://api.stg.deversifi.com/market-data/tickers?symbols=${params.symbol}`
    let url = `https://api.deversifi.com/market-data/ticker/${params.symbol}`


    const response = await axios(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })

    return response.data
}

async function makeRequest4() {
    const params = {
        symbol: "ETH:LDO",
        precision: "P0",
        length: "25",
    }
    // let url = `https://api.deversifi.com/v1/trading/r/getConf`
    // let url = `https://api.stg.deversifi.com/market-data/tickers?symbols=${params.symbol}`
    let url = `https://api.deversifi.com/market-data/book/${params.symbol}/${params.precision}/${params.length}`


    const response = await axios(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })

    return response.data
}

async function makeRequest5() {
    const params = {
        symbols: 'LDO:ETH'
    }
    let url = `https://api.deversifi.com/market-data/tickers?symbols=${params.symbols}`


    const response = await axios(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })

    return response.data
}


async function makeRequest2() {
    let url = `https://api.deversifi.com/market-data/vwap/LDO:ETH?amount=1&isFirstIn=false`

    const response = await axios(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })

    fs.writeFileSync(path.resolve(__dirname, 'test.txt'), `${response.data.estimatedPrice}, ${response.data.executionPrice}, ${response.data.slippage}${os.EOL}`, { flag: 'as' })

    return response.data
}

(async () => {
    // setInterval(async () => {
    const test = await makeRequest5()
    console.log(test)
    // }, 1000 * 60)
})()


// 0.001214439051288
// 0.19723865877712032

// 1214439051288000
// 197238658777120320
