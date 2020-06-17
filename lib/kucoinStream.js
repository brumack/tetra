const axios = require('axios')
const Socket = require('ws')
const redis = require('redis')
const client = redis.createClient();

client.on("error", function(error) {
    console.error('Redis error', error);
});

const createSocket = async (attempt = 1) => {
    const tokenRes = await axios.post(`https://api.kucoin.com/api/v1/bullet-public`)
    const token = tokenRes.data.data.token
    const endpoint = tokenRes.data.data.instanceServers[0].endpoint
    const socket = new Socket(`${endpoint}?token=${token}`);

    socket.on('message', msg => {
        let event;
        try {
            event = JSON.parse(msg)
            if (event.type === 'welcome')
                socket.send( JSON.stringify({
                    id: Date.now(),
                    type: 'subscribe',
                    topic: '/market/ticker:all',
                    privateChannel: false,
                    response: true  
                }))
            else {
                const pair = event.subject
                const base = pair.split('-')[0]
                const quote = pair.split('-')[1]
                const last = event.data.price

                if ((base === 'BTC' && quote === 'USDT') ||
                    (quote === 'BTC')) {
                    client.HSET(base + quote, 'kucoin', last)
                }
            }
        } catch (e) {
            console.log('Kucoin stream error', e)
        }
    })

    socket.on('error', (err, a) => {
        if (attempt <= 30) {
            setTimeout(() => {
                console.error(`Attempt ${attempt} - Unable to initiate Kucoin stream.`)
                createSocket(attempt + 1)
            }, attempt * 1000)
        }
    })

    socket.on('open', () => console.log('Kucoin socket opened.'))

    socket.on('close', err => {
        if (err) return console.log('Error reopening Kucoin trade stream', err)
        createSocket()
    })
}

(async () => {
    await createSocket()
})()