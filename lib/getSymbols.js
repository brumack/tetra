const request = require('async-request')

module.exports = async () => {
  const data = {}
  const response = await request('https://s2.coinmarketcap.com/generated/search/quick_search.json')
  const jsonResponse = JSON.parse(response.body)
  jsonResponse.map(asset => data[asset.symbol] = asset)
  console.log(data)
}