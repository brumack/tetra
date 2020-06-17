const _ = require("lodash")
const { User } = require('../models/User')
const UserSession = require('../models/UserSession')
const { expiredSession, serverError, unauthorized } = require('../lib/serverResponses')


module.exports = async (req, res, next) => {
    const correctAuthType = req.headers.authorization.split(' ')[0] === 'Bearer'
    const token = req.headers.authorization.split(' ')[1]

    if (!correctAuthType || 
        !token || 
        !token.match(/^[0-9a-fA-F]{24}$/)) return unauthorized(res)

    let session = null

    try {
        session = await UserSession.findOne({ _id: token, isDeleted: false }).exec()
    } catch (e) {
        console.log('Error locating user session.', e)
        return serverError(res)
    }

    if (_.isNull(session)) return expiredSession(res)

    let user = null
    try {
        user = await User.findOne({ _id: session.userId }).exec()
    } catch (e) {
        console.log('Error finding user.', e)
        return serverError(res)
    }

    if (_.isNull(user)) {
        try {
            await UserSession.deleteOne({_id: token})
        } catch (e) {
            console.log('Unable to delete token after being unable to locate associated user.', e)
            return serverError(res)
        }
    }

    req.user = user
    next()
}