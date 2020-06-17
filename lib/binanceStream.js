const axios = require('axios')
const Socket = require('ws')

const getAllAssets = async () => {
    let res

    try {
        res = await axios.get('https://api.binance.com/api/v3/exchangeInfo')
        const btcPairs = res.data.symbols.filter(asset => asset.quoteAsset === 'BTC')
        return btcPairs.map(pair => pair.symbol.toLowerCase())
    } catch(e) {
        throw `Unable to fetch assets from Binance. ${e}`
    }
 }

const createURL = pairs => {
    const baseUrl = ' wss://stream.binance.com:9443'
    const socketUrl = baseUrl + '/stream?streams=' + pairs.map(pair => `${pair}@trade`).join('/')
    return socketUrl + '/btcusdt@trade'
}

const createSocket = async (attempt = 1) => {

    const assets = await getAllAssets()
    const url = createURL(assets)
    const socket = new Socket(url)

    socket.on('message', msg => {
        let event;
        try {
            event = JSON.parse(msg)
            const { s, p } = event.data
            client.SADD('binance', s)
            client.HSET(s, 'binance', p)
        } catch (e) {
            console.log('Binance stream error', e)
        }
    })

    socket.on('error', (err, a) => {
        if (attempt <= 30) {
            setTimeout(() => {
                console.error(`Attempt ${attempt} - Unable to initiate stream for ${url}`)
                createSocket(attempt + 1)
            }, attempt * 1000)
        }
    })

    socket.on('open', () => console.log('Binance socket opened.'))

    socket.on('close', err => {
        if (err) return console.log('Error reopening Binance trade stream', err)
        createSocket()
    })
}



module.exports = {
    createSocket,
    setClient : function(inClient) { client = inClient }
}