const express = require('express')
const router = express.Router()

const getAssetData = require('../lib/getAssetData')

let assets = {}
let allAssetData

(async () => {
  const response = await getAssetData()
  console.log(response.Message)
  allAssetData = response.Data
})()

router.get('/userAssets', (req, res) => {
  res.json(assets)
})

router.post('/userAssets', (req, res) => {
  assets[req.body.name] = { quantity: Number(req.body.quantity) }
  res.redirect('/')
})

router.get('/allAssets', (req, res) => {
  res.json(allAssetData)
})

router.get('allAssets/:asset', (req, res) => {
  res.json(allAssetData[req.params.asset])
})

module.exports = router