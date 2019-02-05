const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../models/user')

router.post(`/login`, passport.authenticate(`local`,
  {
    successRedirect: `/beaches`,
    failureRedirect: `/login`
  })
)

router.post('/signup', (req, res) => {
  const newUser = new User({ username: req.body.username })

  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      res.end({
        success: false,
        message: err.message
      })
    }

    passport.authenticate(`local`)(req, res, () => {
      res.end({
        success: true,
        message: 'User created'
      })
    })
  })
})

module.exports = router
