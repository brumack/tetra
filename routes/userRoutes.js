const router = require('express').Router()
const User = require('../models/User')
const UserSession = require('../models/UserSession')
const bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({ extended: true }))

router.post('/new', (req, res) => {
  const { body } = req
  let { email, password } = body

  if (!email) {
    return res.send({
      success: false,
      message: 'Email address required.'
    })
  }

  if (!password) {
    return res.send({
      success: false,
      message: 'Password Required'
    })
  }

  email = email.toLowerCase()
  User.find({ email }, (err, users) => {
    if (err) {
      return res.end({
        success: false,
        message: 'Server error.'
      })
    }

    if (users.length > 0) {
      return res.send({
        success: false,
        message: 'Account already exists. Please try again.'
      })
    }

    const newUser = new User()
    newUser.email = email
    newUser.password = newUser.generateHash(password)
    newUser.save((err, user) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Server error'
        })
      }
      const userSession = new UserSession()
      userSession.userId = user._id
      userSession.save((err, doc) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Server error.'
          })
        }

        return res.send({
          success: true,
          message: 'New User Created.',
          token: doc._id
        })
      })
    })
  })
})

router.post('/login', (req, res) => {
  const { body } = req
  let { email, password } = body

  if (!email) {
    return res.send({
      success: false,
      message: 'Email address required.'
    })
  }

  if (!password) {
    return res.send({
      success: false,
      message: 'Password Required'
    })
  }

  email = email.toLowerCase()

  User.find({ email }, (err, users) => {
    if (err) {
      return res.end({
        success: false,
        message: 'Server error.'
      })
    }

    if (users.length !== 1) {
      return res.send({
        success: false,
        message: 'Invalid credentials. Please try again.'
      })
    }

    const user = users[0]
    if (!user.validatePassword(password)) {
      return res.send({
        success: false,
        message: 'Invalid credentials. Please try again.'
      })
    }

    const userSession = new UserSession()
    userSession.userId = user._id
    userSession.save((err, doc) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Server error.'
        })
      }

      return res.send({
        success: true,
        message: 'Login successfull.',
        token: doc._id
      })
    })
  })
})

router.get('/verify', (req, res) => {
  const { query } = req
  const { token } = query

  if (token.match(/^[0-9a-fA-F]{24}$/)) {
    UserSession.find({ _id: token, isDeleted: false }, (err, sessions) => {
      if (err) {
        console.log(err)
        return res.send({
          success: false,
          message: 'Error: Server error.'
        })
      }

      if (sessions.length !== 1) {
        return res.send({
          success: false,
          message: 'Error: Invalid session'
        })
      }

      return res.send({
        success: true,
        message: 'Valid session'
      })
    })
  } else {
    return res.send({
      success: false,
      message: 'Error: Invalid token.'
    })
  }
})

router.get('/assets', (req, res) => {
  const { query } = req
  const { token } = query

  if (token.match(/^[0-9a-fA-F]{24}$/)) {
    UserSession.find({ _id: token, isDeleted: false }, (err, sessions) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server error.'
        })
      }

      if (sessions.length !== 1) {
        return res.send({
          success: false,
          message: 'Error: Invalid session'
        })
      }

      const session = sessions[0]

      User.find({ _id: session.userId }, (err, users) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Error: Server error.'
          })
        }

        const user = users[0]
        const assetArray = user.assets

        return res.send({
          success: true,
          data: assetArray
        })
      })
    })
  } else {
    return res.send({
      success: false,
      message: 'Error: Invalid token.'
    })
  }
})

router.put('/assets', (req, res) => {
  const { body } = req
  const { token, asset } = body

  if (token.match(/^[0-9a-fA-F]{24}$/)) {
    const session = UserSession.find({ _id: token, isDeleted: false }).exec()
    session.then(doc => {
      if (doc.length < 1) {
        console.log('invalid session')
        res.send({
          success: false,
          message: 'Invalid session.'
        })
      } else {
        const foundUser = User.find({ _id: doc[0].userId, isDeleted: false }).exec()
        foundUser.then(doc => {
          if (!doc[0]) {
            res.send({
              success: false,
              message: 'Server error.'
            })
          } else {
            const user = doc[0]
            if (user.assets.map(userAsset => userAsset.asset).indexOf(asset) === -1) {
              User.updateOne({ _id: user._id }, { $push: { 'assets': { 'asset': asset, trades: [], quantity: 0 } } }, (err, result) => {
                if (err) {
                  res.send({
                    success: false,
                    message: 'Server error.'
                  })
                } else {
                  res.send({
                    success: true,
                    message: 'Assets updated.'
                  })
                }
              })
            } else {
              res.send({
                success: false,
                message: 'Asset already added.'
              })
            }
          }
        })
      }
    })
  } else {
    res.send({
      success: false,
      message: 'Invalid token.'
    })
  }
})

router.delete('/assets', (req, res) => {
  const { query } = req
  const { token, asset } = query

  if (token.match(/^[0-9a-fA-F]{24}$/)) {
    const session = UserSession.find({ _id: token, isDeleted: false }).exec()
    session.then(doc => {
      if (doc.length < 1) {
        console.log('invalid session')
        res.send({
          success: false,
          message: 'Invalid session.'
        })
      } else {
        const foundUser = User.find({ _id: doc[0].userId, isDeleted: false }).exec()
        foundUser.then(doc => {
          if (!doc[0]) {
            res.send({
              success: false,
              message: 'Server error.'
            })
          } else {
            const user = doc[0]
            if (user.assets.map(asset => asset.asset).indexOf(asset) !== -1) {
              User.updateOne({ _id: user._id }, { '$pull': { 'assets': { 'asset': asset } } }, (err, result) => {
                if (err) {
                  res.send({
                    success: false,
                    message: 'Server error.'
                  })
                } else {
                  res.send({
                    success: true,
                    message: 'Asset removed.'
                  })
                }
              })
            } else {
              res.send({
                success: false,
                message: 'Asset not available to remove.'
              })
            }
          }
        })
      }
    })
  } else {
    res.send({
      success: false,
      message: 'Invalid token.'
    })
  }
})

router.get('/logout', (req, res) => {
  const { query } = req
  const { token } = query

  if (token.match(/^[0-9a-fA-F]{24}$/)) {
    UserSession.findOneAndUpdate(
      {
        _id: token,
        isDeleted: false
      },
      {
        $set: { isDeleted: true }
      },
      err => {
        if (err) {
          return res.send({
            success: false,
            message: 'Error: Server error.'
          })
        }

        return res.send({
          success: true,
          message: 'Logged out.'
        })
      })
  } else {
    return res.send({
      success: false,
      message: 'Error: Invalid token.'
    })
  }
})

module.exports = router
