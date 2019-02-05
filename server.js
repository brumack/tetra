const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const apiRoutes = require('./routes/apiRoutes')

app.use('/api', apiRoutes)
app.use(bodyParser.urlencoded({ extended: true }))

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
