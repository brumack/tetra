const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
router.use(bodyParser.json())

const getAssetData = require('../lib/getAssetData')

let assets = {}
let allAssetData

(async () => {
  const response = await getAssetData()
  allAssetData = response.Data
})()

router.get('/userAssets', (req, res) => {
  res.json(assets)
})

router.post('/userAssets', (req, res) => {
  if (!assets[req.body.userAsset] && Object.keys(allAssetData).indexOf(req.body.userAsset) !== -1) {
    assets[req.body.userAsset] = { quantity: 0, trades: [] }
  }
  res.end()
})

router.put('/userAssets', (req, res) => {
  const { asset, quantity, side, price, date } = req.body
  if (assets[asset]) {
    assets[asset].trades.push({ side, quantity, price, date })
    const newQuantity = assets[asset].trades.map(trade => {
      if (trade.side === 'SELL') {
        return 0 - trade.quantity
      } else {
        return trade.quantity
      }
    }).reduce((a, b) => a + b)
    assets[asset].quantity = newQuantity
  }
})

router.delete('/userAssets/:asset', (req, res) => {
  const asset = req.params.asset
  delete assets[asset]
  res.send({
    success: true
  })
})

router.post('/userAssets/trade/:asset', (req, res) => {
  res.redirect('/')
})

router.get('/allAssets', (req, res) => {
  res.json(allAssetData)
})

router.get('/allAssets/:asset', (req, res) => {
  res.json(allAssetData[req.params.userAsset])
})

module.exports = router
