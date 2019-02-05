const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const path = require('path')
const apiRoutes = require('./routes/apiRoutes')

app.use('/api', apiRoutes)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'client/build')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
