'use strict'

const KeyToken = require('../models/keyToken.model')
const { Types } = require('mongoose')
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

    static findByUserID = async ({ userId }) => {
        console.log(userId)
        return await KeyToken.findOne({ user: userId }).lean()
    }

    static removeKeyStore = async (id) => {
        console.log("id", id)
        const del = await KeyToken.findOneAndDelete({ _id: id })
        console.log(del)
        return del
    }

    static findByRefreshTokenUsed = async (refreshToken) => {
        return await KeyToken.findOne({ refreshTokenUsed: refreshToken }).lean()
    }

    static deleteKeyById = async (userId) => {
        return await KeyToken.deleteOne({ user: userId })
    }

    static findByRefreshToken = async (refreshToken) => {
        return await KeyToken.findOne({ refreshToken })
    }
}

module.exports = KeyTokenService