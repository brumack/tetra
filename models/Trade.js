const mongoose = require('mongoose')
const Trade = require('../models/Trade')

const TradeSchema = new mongoose.Schema({
  userId: String,
  timestamp: {
    type: Date,
    default: Date.now()
  },
  Asset: String,
  Quantity: Number,
  Price: Number,
  Date: Date,
  isDeleted: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('Trade', TradeSchema)