const router = require('express').Router()
const bodyParser = require('body-parser')

router.get('/:id/trade', (req, res) => {
  console.log(req.query)
})

router.get('/:id/trades', (req, res) => {
  console.log(req.query)
})

router.post('/trades', (req, res) => {
  console.log(req.body)
})

router.put('/trades/:asset', (req, res) => {
  console.log(req.body)

router.delete('/trades/:asset', (req, res) => {
  console.log(req.query)
})

module.exports = router