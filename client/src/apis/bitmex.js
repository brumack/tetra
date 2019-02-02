import axios from 'axios'

export default axios.create({
  baseURL: 'https://www.bitmex.com/api/v1'
})