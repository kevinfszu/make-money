/**
 * API 来源：https://docs.1inch.io/docs/aggregation-protocol/api/swagger
 */

const axios = require('axios').default
const tunnel = require('tunnel')

const tunnelProxy = tunnel.httpsOverHttp({
    proxy: {
        host: '127.0.0.1',
        port: '58591'
    }
})

// 修改 axios 全局配置。（可以在实例中配置覆盖此全局配置）
axios.defaults.proxy = false
axios.defaults.httpsAgent = tunnelProxy

const chainId = 1;      // 区块链 ID。详见：https://chainlist.org/
const apiBaseUrl = 'https://api.1inch.io/v4.0/' + chainId

function buildApiRequestUrl(methodName, queryParams = {}) {
    return apiBaseUrl + methodName + '?' + (new URLSearchParams(queryParams)).toString()
}


async function fetTokens() {
    const tokens = await axios(buildApiRequestUrl('/tokens'))
        .then(res => {
            // console.log(res.data)
            return res.data.tokens
        })

    // console.log(tokens)
    return tokens
}
// fetTokens()     // FIXME: 用于测试


async function fetchQuote(quoteParams) {
    // const quoteParams = {
    //     fromTokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', // ETH
    //     toTokenAddress: '0x5a98fcbea516cf06857215779fd812ca3bef1b32', // LDO
    //     amount: '1000000000000000000'
    // }

    const quote = await axios(buildApiRequestUrl('/quote', quoteParams))
        // .then(res => res.json())
        .then(res => {
            // console.log(res.data)
            return res.data
        })
        // .catch((err) => {
        //     console.log('获取最佳报价出错。', quoteParams, err)
        // })
    console.log('quote api: ', quote)

    return quote
}
fetchQuote({
    fromTokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', // ETH
    toTokenAddress: '0x5a98fcbea516cf06857215779fd812ca3bef1b32', // LDO
    amount: '1000000000000000000'
})     // FIXME: 用于测试


module.exports = {
    fetTokens,
    fetchQuote
}
