export function retrieveToken(key) {

  if (!key) {
    return null
  }

  try {
    const keyObj = localStorage.getItem(key)
    if (keyObj) {
      return JSON.parse(keyObj)
    }
  } catch (e) {
    console.log(e)
    return null
  }
}

export function storeToken(obj) {
  if (!obj) {
    console.err('Error: Missing Key')
  }

  try {
    console.log(obj)
    localStorage.setItem('TETRA', JSON.stringify(obj))
  } catch (e) {
    console.err(e)
  }
}
