import local from '../apis/local'
import cc from '../apis/cc'

export async function verify(token) {
  const response = await local.get(`/users/verify?token=${token}`)
  if (response.data.success) {
    return { token: token, isLoading: false }
  } else {
    return { isLoading: false }
  }
}

export async function login(credentials) {
  const response = await local.post(`/users/login`, credentials)
  return response.data
}

export async function signup(credentials) {
  const response = await local.post(`/users/new`, credentials)
  return response.data
}

export async function logout(token) {
  const response = await local.get(`/users/logout?token=${token}`)
  if (response.data.success) {
    return { token: null, userAssets: null }
  } else {
    console.log('error')
  }
}

export async function getAllAssets() {
  const response = await local.get('/allAssets')
  return { allAssets: response.data }
}

export async function getUserAssets(token) {
  const response = await local.get(`/users/assets?token=${token}`)
  return { userAssets: response.data.data }
}

export async function addAsset(token, asset) {
  const response = await local.put(`users/assets`, { token, asset })
  return response.data
}

export async function getPrice(asset) {
  const response = await cc.get(`/price?fsym=${asset}&tsyms=USD`)
  return response.data
}