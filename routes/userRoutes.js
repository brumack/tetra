const router = require('express').Router()
const _ = require('lodash')
const { User } = require('../models/User')
const Asset = require('../lib/Asset')
const UserSession = require('../models/UserSession')
const bodyParser = require('body-parser')
const isLoggedIn = require('../middleware/isLoggedIn')
const { userExists, serverError, invalidInfo, invalidCredentials } = require('../lib/serverResponses')
let client

router.use(bodyParser.json())

router.post('/new', async (req, res) => {
  const { body } = req
  let { email, password, verifyPassword } = body
  const emailCheck = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)

  if (!email) return invalidInfo(res, 'Email address required.')
  if (!password) return invalidInfo(res, 'Password Required.')
  if (!verifyPassword) return invalidInfo(res, 'Passwords do not match.')
  if (email.toLowerCase().search(emailCheck) !== 0) return invalidInfo(res, 'Invalid email address.')
  if (password.length < 8) return invalidInfo(res, 'Invalid password. Password must be 8 characters or longer.')
  if (password !== verifyPassword) invalidInfo(res, 'Passwords do not match.')
    

  try {
    const user = await User.findOne({ email }).exec()
    if (!_.isNull(user)) return userExists(res)
  } catch (e) {
    console.log('error finding user', e)
    return serverError(res)
  }

  let user

  try {
    user = new User({ email })
    user.password = user.generateHash(password)
    await user.save()
  } catch(e) {
    console.log('error creating user', e)
    return serverError(res)
  }
  
  try {
    const userSession = new UserSession({ userId: user._id})
    const session = await userSession.save()
    return res.send({
      success: true,
      message: 'New User Created.',
      token: session._id,
      email
    })
  } catch (e) {
    console.log('error creating session', e)
    return serverError(res)
  }
})

router.post('/login', async (req, res) => {
  const { body } = req
  let { email, password } = body

  if (!email) return invalidInfo(res, 'Email address required.')
  if (!password) return invalidInfo(res, 'Password Required')
  
  email = email.toLowerCase()
  let user = null

  try {
    user = await User.findOne({ email }).exec()
  } catch (e) {
    return serverError(res)
  }

  if (_.isNull(user)|| !user.validatePassword(password)) return invalidCredentials(res)

  const userSession = new UserSession({ userId: user._id })
  let session = null

  try {
    session = await userSession.save()
  } catch (e) {
    return serverError(res)
  }

  if (session === userSession)
    return res.status(200).json({
      success: true,
      message: 'Login successfull.',
      token: session._id
    })
  
  return serverError(res)
})

router.get('/verify', isLoggedIn, (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Valid session'
  })
})

router.get('/assets', isLoggedIn, async (req, res) => {
  let { user } = req

  try {
    user = await User.findById(req.user._id).exec()
  } catch (e) {
    console.log('Error retrieving user assets.', e)
    return serverError()
  }
  
  return res.status(200).json({
    success: true,
    data: user.assets
  })   
})

router.post('/assets', isLoggedIn, async (req, res) => {
  const { body, user } = req
  const { symbol, exchange, balance } = body
  let asset = null, updatedUser = null

  if (!symbol) return invalidInfo(res, 'Please provide an asset to add.')

  const upperSymbol = symbol.toUpperCase()
  const pair = upperSymbol === 'BTC' ? 'BTCUSDT' : `${upperSymbol}BTC`

  if (!user.assets.map(userAsset => userAsset.symbol).includes(symbol)) {
    try {
      const exchanges = await client.hkeysAsync(pair)
      if (exchanges.includes(exchange)) {
        asset = new Asset({ symbol, exchange })
        asset.symbol = symbol
        asset.exchange = exchange
        asset.balance = balance || 0
      } else return invalidInfo(res, 'Unable to add asset. Not supported by selected exchange.')
    } catch (e) {
      console.log(`Unable to retrive asset exchanges for ${symbol}.`, e)
      return serverError(res)
    }
    
    try {
      updatedUser = await User.updateOne({ _id: user._id }, { $push: { 'assets': asset } }).exec()
    } catch (e) {
      console.log('Error updating user assets.', e)
      return serverError(res)
    }

    if (updatedUser) {
      return res.status(200).json({
        success: true,
        message: 'Asset added.'
      })
    }
  
  } else return invalidInfo(res, 'Asset already added.')
})

router.put('/assets', isLoggedIn, async (req, res) => {
  const { body, user } = req
  const { symbol, exchange, balance } = body
  const assetIndex = user.assets.map(userAsset => userAsset.symbol).indexOf(symbol)
  
  if (assetIndex !== -1) {
    user.assets[assetIndex] = { symbol, exchange, balance }
    let updatedUser = null

    try {
      updatedUser = await User.updateOne({ _id: user._id }, { $set: { 'assets': user.assets } }).exec()
    } catch(e) {
      return serverError(res)
    }

    if (_.isNull(updatedUser)) return serverError(res)
    return res.status(200).json({ success: true, message: 'Asset updated.' })
  } else return invalidInfo(res, 'Asset unowned. Please add.')
})

router.delete('/assets', isLoggedIn, async (req, res) => {
  const { query, user } = req
  const { symbol } = query

  const updatedAssets = user.assets.filter(userAsset => userAsset.symbol !== symbol)

  try {
    await User.updateOne({ _id: user._id }, { $set: { 'assets': updatedAssets } }).exec()
    return res.status(200).json({
      success: true,
      message: 'Asset removed.'
    })
  } catch (e) {
    return serverError(res)
  }
})

router.get('/logout', async (req, res) => {
  const { query } = req
  const { token } = query

  try {
    await UserSession.findOneAndUpdate({
      _id: token,
      isDeleted: false
    },{
      $set: { isDeleted: true }
    }).exec()
  } catch(e) {
    return serverError(res)
  }

  return res.status(200).json({
    success: true,
    message: 'Logged out.'
  })
})

module.exports = {
  router,
  setClient : function(inClient) { client = inClient }
}
