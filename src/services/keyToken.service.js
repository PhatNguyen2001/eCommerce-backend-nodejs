'use strict'

const keyTokenModel = require('../models/keyToken.model')

class KeyTokenService {
    static createKeyToken = async ({ userId, publicKey, privateKey }) => {
        try {
            // const publicKeyString = publicKey.toString()
            const token = await keyTokenModel.create({
                user: userId,
                // publicKey: publicKeyString,
                publicKey,
                privateKey
            })

            // console.log('tokenssadas',token.publicKey)
            return token ? token.publicKey : null
        } catch (err) {
            return err
        }
    }
}

module.exports = KeyTokenService