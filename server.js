const bodyParser = require('body-parser')
const express = require('express')
const morgan = require('morgan')
const path = require('path')
const app = express()

const normalizePort = port => parseInt(port, 10)
const PORT = normalizePort(process.env.PORT || 5000)
const indexRoutes = require('./routes/indexRoutes')
const apiRoutes = require('./routes/apiRoutes')

app.disable('x-powered-by')
app.use(morgan('common'))
app.use(bodyParser.urlencoded({ extended: true }));

app.use(indexRoutes)
app.use('/api', apiRoutes)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));