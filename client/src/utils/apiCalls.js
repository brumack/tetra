import local from '../apis/local'

export function getPrice(asset, token, callback) {
  local.get(`assets/last?asset=${asset}&exchange=binance&token=${token}`).then(response => {
    callback(response.data)
  }).catch(err => {
    console.log(err)
  })
}