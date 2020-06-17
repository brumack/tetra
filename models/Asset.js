const mongoose = require('mongoose')

const AssetSchema = new mongoose.Schema({
  Symbol: String,
  ImageUrl: String,
  Name: String,
  Symbol: String,
  CoinName: String,
  Algorithm: String,
  ProofType: String,
  FullyPremined: String,
  TotalCoinSupply: String,
  BuiltOn: String,
  SmartContractAddress: String,
  DecimalPlaces: Number,
  PreMinedValue: String,
  TotalCoinsFreeFloat: String,
  TotalCoinsMined: Number,
  BlockNumber: Number,
  NetHashesPerSecond: Number,
  BlockReward: Number,
  BlockTime: Number
})

module.exports = mongoose.model('Asset', AssetSchema)