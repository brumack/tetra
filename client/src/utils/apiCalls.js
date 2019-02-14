import cc from '../apis/cc'

export function getPrice(asset, callback) {
  cc.get(`/price?fsym=${asset}&tsyms=USD`).then(response => {
    callback(response.data)
  }).catch(err => {
    console.log(err)
  })
}