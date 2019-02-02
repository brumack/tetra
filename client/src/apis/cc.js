import axios from 'axios'

export default axios.create({
  baseURL: 'https://min-api.cryptocompare.com/data',
  headers: { 'authorization': `Apikey 32410066-a834-4d00-a379-8128f5af772a` }
})