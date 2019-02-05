// PACKAGE IMPORTS
// const LocalStrategy = require('passport-local')
const bodyParser = require('body-parser')
// const mongoose = require('mongoose')
// const passport = require('passport')
const express = require('express')
const app = express()

// MODEL IMPORTS
// const User = require('./models/User')

// DATABASE CONFIG
// mongoose.connect(`mongodb://localhost:27017`, { useNewUrlParser: true })

// ROUTES
const indexRoutes = require('./routes/indexRoutes')
const apiRoutes = require('./routes/apiRoutes')
// const accountRoutes = require('./routes/account')
app.use(indexRoutes)
app.use('/api', apiRoutes)
// app.use('/api/account', accountRoutes)

app.use(bodyParser.urlencoded({ extended: true }))

// USER AUTH AND SESSIONS
// app.use(require('express-session')({ secret: `Fquhugads`, resave: false, saveUnitialized: false }))
// app.use(passport.initialize())
// app.use(passport.session())
// passport.use(new LocalStrategy(User.authenticate()))
// passport.serializeUser(User.serializeUser())
// passport.deserializeUser(User.deserializeUser())

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
