'use strict'

const KeyToken = require('../models/keyToken.model')
const keyTokenModel = require('../models/keyToken.model')

class KeyTokenService {
    static createKeyToken = async ({ userId, publicKey, privateKey, refreshToken }) => {
        try {
            // const publicKeyString = publicKey.toString()
            //level 0 
            // const token = await keyTokenModel.create({
            //     user: userId,
            //     // publicKey: publicKeyString,
            //     publicKey,
            //     privateKey
            // })
            //level 1
            const filter = { user: userId }, update = {
                publicKey, privateKey, refreshTokenUsed: [], refreshToken
            }, options = { upsert: true, new: true }
            const token = await KeyToken.findOneAndUpdate(filter, update, options)
            return token ? token.publicKey : null
            // console.log('tokenssadas',token.publicKey)
            return token ? token.publicKey : null
        } catch (err) {
            return err
        }
    }
}

module.exports = KeyTokenService