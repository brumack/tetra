require('dotenv').config()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const path = require('path')
const userRoutes = require('./routes/userRoutes')
const assetRoutes = require('./routes/assetRoutes')
const binanceStream = require('./lib/binanceStream')
const getAssetData = require('./lib/getAssetData')

const redis = require('redis')
const bluebird = require('bluebird')
bluebird.promisifyAll(redis)
const client = redis.createClient();

client.on("error", function(error) {
  console.error('Redis error', error);
});

userRoutes.setClient(client)
assetRoutes.setClient(client)
binanceStream.setClient(client)

binanceStream.createSocket()
// getAssetData()

app.use('/api/users', userRoutes.router)
app.use('/api/assets', assetRoutes.router)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'client/build')))

mongoose.connect(process.env.DATABASEURL, { useNewUrlParser: true, useUnifiedTopology: true })

app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/client/build/index.html`))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))