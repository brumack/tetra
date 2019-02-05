import mongoose from 'mongoose'

const UserSessionSchema = new mongoose.Schema({
  userId: {
    type: Number,
    default: -1
  },
  timestamp: {
    type: Date,
    default: Date.now()
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
})

export default mongoose.model('UserSession', UserSessionSchema)
