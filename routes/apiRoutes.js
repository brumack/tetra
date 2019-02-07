const router = require('express').Router()
const bodyParser = require('body-parser')

const getAssetData = require('../lib/getAssetData')

let allAssetData

(async () => {
  const response = await getAssetData()
  allAssetData = response.Data
})()

router.get('/allAssets', (req, res) => {
  res.json(allAssetData)
})

router.get('/allAssets/:asset', (req, res) => {
  res.json(allAssetData[req.params.userAsset])
})

module.exports = router
