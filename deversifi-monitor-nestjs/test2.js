// (async () => {
//   async function makeRequest() {
//     const params = {
//       symbols: 'ETH:USDT',
//     };
//     let url = `https://api.stg.rhino.fi/market-data/tickers`;
//     url += `?symbols=${params.symbols}`;
//     const response = await fetch(url, {
//       method: 'GET',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//     });
//     return response.json();
//   }
//   const test = await makeRequest();
//   console.log(test);
// })();

(async () => {
  async function makeRequest() {
    const params = {
      symbol: 'ETH:BTC',
    };
    const url = `https://api.stg.rhino.fi/market-data/ticker/${params.symbol}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  }
  const test = await makeRequest();
  console.log(test);
})();
