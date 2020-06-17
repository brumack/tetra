const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserAssetSchema = new mongoose.Schema({
  Symbol: String,
  Exchange: String,
  Balance: Number
})

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    default: ''
  },
  assets: [{}],
  isDeleted: {
    type: Boolean,
    default: false
  }
})

UserSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}
UserSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

module.exports = {
  UserAsset: mongoose.model('UserAsset', UserAssetSchema),
  User: mongoose.model('User', UserSchema)
}
