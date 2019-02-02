const request = require('async-request')

module.exports = async () => {
  const options = {
    headers: { 'authorization': `Apikey 32410066-a834-4d00-a379-8128f5af772a` }
  }

  try {
    const response = await request('https://min-api.cryptocompare.com/data/all/coinlist', options)
    return JSON.parse(response.body)
  } catch (e) {
    return e
  }
}

//responseURL: "https://min-api.cryptocompare.com/data/all/coinlist/price?fsym=XRP&tsyms=USD"
