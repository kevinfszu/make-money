/**
 * API 来源：https://docs.1inch.io/docs/aggregation-protocol/api/swagger
 */

const fetch = require('node-fetch')


const chainId = 1;      // 区块链 ID。详见：https://chainlist.org/
const apiBaseUrl = 'https://api.1inch.io/v4.0/' + chainId

function buildApiRequestUrl(methodName, queryParams = {}) {
    return apiBaseUrl + methodName + '?' + (new URLSearchParams(queryParams)).toString()
}

async function fetTokens() {
    const tokens = await fetch(buildApiRequestUrl('/tokens'))
        .then(res => res.json())
        .then(res => res.tokens)
    return tokens
}
// fetTokens()     // FIXME: 用于测试

async function fetchQuote(quoteParams) {
    // const quoteParams = {
    //     fromTokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', // ETH
    //     toTokenAddress: '0x5a98fcbea516cf06857215779fd812ca3bef1b32', // LDO
    //     amount: '1000000000000000000'
    // }

    const quote = await fetch(buildApiRequestUrl('/quote', quoteParams))
        .then(res => res.json())
        .then(res => res)
    // console.log('quote api: ', quote)

    return quote
}


module.exports = {
    fetTokens,
    fetchQuote
}
