const request = require('async-request')
const Asset = require('../models/Asset')
const { isNull } = require('lodash')

const getAssetData = async () => {
  const options = {
    headers: { 'authorization': `Apikey 32410066-a834-4d00-a379-8128f5af772a` }
  }

  try {
    const response = await request('https://min-api.cryptocompare.com/data/all/coinlist', options)
    const assetsObject = JSON.parse(response.body).Data
    const assets = []
    Object.keys(assetsObject).map(asset => assets.push(assetsObject[asset]))
    assets.forEach(asset => saveAssetToDatabase(asset))
  } catch (e) {
    return e
  }
}

async function saveAssetToDatabase(asset) {
  // Check if doc exists
  const doc = await Asset.findOne({Symbol: asset.Symbol}).exec()
  // If not then save
  if (isNull(doc)) {
    const newAsset = new Asset(asset)
    await newAsset.save(asset).exec
  } else {
    console.log(`${asset.Symbol} already saved to db.`)
  }
}

module.exports = getAssetData
