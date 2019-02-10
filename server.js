const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const path = require('path')
const apiRoutes = require('./routes/apiRoutes')
const userRoutes = require('./routes/userRoutes')

app.use('/api', apiRoutes)
app.use('/api/users', userRoutes)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'client/build')))

mongoose.connect(process.env.DATABASEURL, { useNewUrlParser: true })
// mongoose.connect('mongodb://127.0.0.1:27017/tetra', { useNewUrlParser: true })

app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/client/build/index.html`))
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
