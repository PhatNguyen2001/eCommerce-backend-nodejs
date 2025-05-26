'use strict'

const JWT = require('jsonwebtoken')
const { asyncHandler } = require('../helper/asyncHandler')
const { UnAuthorization, NotFoundError } = require('../core/error.response')
const KeyTokenService = require('../services/keyToken.service')

const HEADER = {
    API_KEY: 'x-api-key',
    CLIENT_ID: 'x-client-id',
    AUTHORIZATION: 'authorization'
}

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

const authentication = asyncHandler(async (req, res, next) => {
    /*
        1 - check userId missing ?
        2 - get accessToken 
        3 - verifyToken 
        4 - chec user in DB 
        5 - ok all => return next()
    */

    const userId = req.headers[HEADER.CLIENT_ID]
    if (!userId) throw new UnAuthorization('Invalid request')
    const keyStore = await KeyTokenService.findByUserID({ userId })
    console.log(keyStore)
    if (!keyStore) throw new NotFoundError('Not Found Key store')
    const accessToken = req.headers[HEADER.AUTHORIZATION]
    const token = accessToken.replace('Bearer ', '');
    if (!accessToken) throw new UnAuthorization('AcessToken not found!')
    try {
        const decodeUser = JWT.verify(token, keyStore.publicKey)
        if (userId !== decodeUser.userId) throw new UnAuthorization('Invalid User')
        req.keyStore = keyStore
        return next()
    } catch (err) {
        console.log(err)
        throw err
    }
})

module.exports = {
    createTokenPair,
    authentication
}