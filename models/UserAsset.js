const mongoose = require('mongoose')

const UserAssetSchema = new mongoose.Schema({
  Symbol: String,
  Exchange: String,
  Balance: Number
})

module.exports = mongoose.model('UserAsset', UserAssetSchema)