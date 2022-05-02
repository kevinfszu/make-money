const axios = require('axios')
// const fetch = require('fetch')
// const fetch = require('node-fetch')

async function makeRequest() {
    const params = {
        symbol: 'ETH:DAI',
    }
    let url = `https://api.stg.deversifi.com/market-data/ticker/${params.symbol}`
    // const response = await axios({
    //     proxy: {
    //         protocol: 'socks5',
    //         host: '127.0.0.1',
    //         port: 51837
    //     },
    //     url: url,
    //     method: 'get',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //     }
    // })

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
    })

    console.log(response)
    // return response.json()
}

(async () => {
    const test = await makeRequest()
    console.log(test)
})()
