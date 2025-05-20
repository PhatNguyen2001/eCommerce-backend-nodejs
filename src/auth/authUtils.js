'use strict'

const JWT = require('jsonwebtoken')

const createTokenPair = async (payload, publicKey, privateKey) => {

    const accessToken = await JWT.sign(payload, publicKey, {
        expiresIn: '2 days'
    })

    const refreshToken = await JWT.sign(payload, privateKey, {
        expiresIn: '7 days'
    })

    const jwt = JWT.verify(accessToken, publicKey)
    console.log('JWT::', jwt)
    const jwtRefresh = JWT.verify(refreshToken, privateKey)
    console.log('refreshToken::', jwtRefresh)
    return { accessToken, refreshToken }
}

module.exports = {
    createTokenPair
}