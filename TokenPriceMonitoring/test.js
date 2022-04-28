const axios = require('axios')

async function makeRequest() {
    const params = {
        symbol: 'ETH:DAI',
    }
    let url = `https://api.stg.deversifi.com/market-data/ticker/${params.symbol}`
    const response = await axios(url, {
        proxy: {
            protocol: 'http',
            host: '127.0.0.1',
            port: 58591
        },
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })

    // console.log(response.toJSON())
    // return response.json()
}

(async () => {
    const test = await makeRequest()
    console.log(test)
})()
