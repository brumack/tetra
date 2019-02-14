export function retrieveToken(key) {
  if (!key) {
    return null
  }

  try {
    const keyString = localStorage.getItem(key)
    if (keyString) {
      return keyString
    }
  } catch (e) {
    console.log(e)
    return null
  }
}

export function storeToken(key) {
  if (!key) {
    console.err('Error: Missing Key')
  }

  try {
    localStorage.setItem('TETRA', key)
  } catch (e) {
    console.err(e)
  }
}
