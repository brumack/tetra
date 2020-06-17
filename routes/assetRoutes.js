const router = require('express').Router()
const _ = require("lodash")
const Asset = require('../models/Asset')
const isLoggedIn = require('../middleware/isLoggedIn')
const { invalidInfo, notFound, serverError } = require('../lib/serverResponses')

router.get('/', isLoggedIn, async (req, res) => {
    const { symbol } = req.query
    let asset = null

    try {
        asset = Asset.findOne({Symbol: symbol}).exec()
    } catch (e) {
        serverError(res)
    }

    if (_.isNull(asset)) return notFound(res, 'Asset not found.')

    const extension = asset.ImageUrl.split('.').pop()
    asset.ImageUrl = `/assetLogos/${Symbol}.${extension}`
    res.status(200).json({
        success: true,
        data: asset
    })
})

router.get('/last', isLoggedIn, async (req, res) => {
    const { query } = req
    const { asset, exchange } = query
    let usdtPrice = null

    try {
        usdtPrice = await client.hget(`BTCUSDT`, exchange)
    } catch (e) {
        console.log('Unable to retrieve BTC value.')
        return invalidInfo(res, 'No BTC Value.')
    }
            
    if (asset === 'BTC') {
        return res.send({
            success: true,
            data: Number(usdtPrice)
        })
    }

    let btcPrice = null

    try {
        btcPrice = client.hget(`${asset}BTC`, exchange)
    } catch (e) {
        console.log('Unable to retrieve asset value.')
        return invalidInfo(res, `No ${asset} Value.`)
    }
 
    return res.send({
        success: true,
        data: Number(btcPrice) * Number(usdtPrice)
    })
})

router.get('/exchanges', isLoggedIn, async (req, res) => {
    const { exchange } = req.query

    if (!exchange) {
        let exchanges = null

        try {
            exchanges = await client.SMEMBERS('exchanges')
        } catch (e) {
            console.log('Unable to retrieve exchange list.')
            return serverError(res)
        }

        res.status(200).json({ success: true, data: exchanges})
    }

    let isExchange = false

    try {
        isExchange = await client.SISMEMBER('exchanges', exchange)
        isExchange = Boolean(isExchange)
    } catch (e) {}

    return res.send({ success: true, data: { isExchange }})
})


module.exports = {
    router,
    setClient : function(inClient) { client = inClient }
}
