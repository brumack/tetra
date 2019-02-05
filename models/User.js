const passportLocalMongoose = require('passport-local-mongoose')
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  created: {
    type: Date,
    default: new Date()
  },
  assets: Array
})

const options = {
  usernamefield: 'email',
  usernameLowerCase: true
}

UserSchema.plugin(passportLocalMongoose, options)

module.exports = mongoose.model('User', UserSchema)
