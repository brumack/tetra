const invalidCredentials = res => {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials. Please try again.'
    })
  }
  
const serverError = res => {
    return res.status(500).json({
      success: false,
      message: 'Server error.'
    })
  }
  
const invalidInfo = (res, msg) => {
    return res.status(400).json({
      success: false,
      message: msg
    })
  }
  
const userExists = res => {
    return res.status(400).json({
        success: false,
        message: 'Account already exists. Please try again.'
    })
}

const unauthorized = res => {
    return res.status(401).json({
        success: false,
        message: 'Invalid credentials. Please try again.'
    })
}
      
const expiredSession = res => {
    return res.status(401).json({
        success: false,
        message: 'Session expired. Please log in.'
    })
}

const notFound = (res, msg) => {
  return res.status(404).json({
    success: false,
    message: msg
  })
}

module.exports = {
    invalidCredentials,
    serverError,
    invalidInfo,
    userExists,
    unauthorized,
    expiredSession,
    notFound
}

