'use strict'
const shopModel = require('../models/shop.model')
const KeyToken = require('../models/keyToken.model')
const crypto = require('crypto')
const KeyTokenService = require('../services/keyToken.service')
const { createTokenPair } = require('../auth/authUtils')
const getInfoData = require('../utils/index')
const { BadRequestError, ConflictRequestErorr } = require('../core/error.response')
const { findByEmail } = require('./shop.service')
const bcrypt = require('bcrypt')
const { token } = require('morgan')
const RoleShop = {
    SHOP: 'SHOP',
    WRITE: 'WRITTER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN'
}

class AccessService {
    static logout = async (keyStore) => {
        return await KeyTokenService.removeKeyStore(keyStore._id)
    }

    /*
        1 - Email
        2 - Password
        3 - create access Token
        4 - generate TOken 
        5 - get data return login
    */
    static login = async ({ email, password, refreshToken = null }) => {
        const foundShop = await findByEmail({ email })
        if (!foundShop) throw new BadRequestError('Shop not register !')
        const match = await bcrypt.compare(password, foundShop.password)
        if (!match) throw new UnAuthorization()
        const privateKey = crypto.randomBytes(64).toString('hex')
        const publicKey = crypto.randomBytes(64).toString('hex')
        const tokens = await createTokenPair({ userId: foundShop._id, email }, publicKey, privateKey)

        const a = await KeyTokenService.createKeyToken({
            refreshToken: tokens.refreshToken,
            privateKey,
            publicKey,
            userId: foundShop._id
        })
        console.log("a::", a)
        return {
            shop: getInfoData({ fileds: ['_id', 'name', 'email'], object: foundShop }),
            tokens
        }
    }

    static signUp = async ({ name, email, password }) => {
        // try {
        const shop = await shopModel.findOne({ email }).lean()
        if (shop) {
            throw new BadRequestError('Error: shop already register!')
        }
        const newShop = await shopModel.create({
            name, email, password, roles: [RoleShop.SHOP]
        })

        let tokens;
        if (newShop) {
            // Generate token
            // created privateKey, publicKey
            // const { privateKey, publicKey } =  crypto.generateKeyPairSync('rsa', {
            //     modulusLength: 4096,
            //     publicKeyEncoding: {
            //         type: 'pkcs1', //pkcs8
            //         format: 'pem'
            //     },
            //     privateKeyEncoding: {
            //         type: 'pkcs1',
            //         format: 'pem'
            //     }
            // })
            //public key CryptoGraphy Standards

            const privateKey = crypto.randomBytes(64).toString('hex')
            const publicKey = crypto.randomBytes(64).toString('hex')

            //console.log(privateKey,publicKey) //save collection KeyStore
            // const pubKeyString = await createKeyToken(newShop.id,publicKey)
            const keyStore = await KeyTokenService.createKeyToken({ userId: newShop._id, publicKey, privateKey })
            console.log("key Tokennnnn:::", keyStore)
            if (!keyStore) {
                throw new BadRequestError('Error: Key Error')
            }
            // const pubKeyStringObject = crypto.createPublicKey(pubKeyString)
            // tokens = await createTokenPair({userId: newShop.id, email}, pubKeyStringObject, privateKey)
            tokens = await createTokenPair({ userId: newShop.id, email }, publicKey, privateKey)
            await KeyToken.findOneAndUpdate(
                { user: newShop.id },
                {
                    $set: {
                        refreshToken: [tokens.refreshToken]
                    }
                },
                { new: true }
            ).exec();
            console.log(`Created Token Success::`, tokens)
        }

        return {
            code: 201,
            metadata: {
                shop: getInfoData({ fileds: ['_id', 'name', 'email'], object: newShop }),
                tokens
            },
        }
        // } catch (err) {
        //     console.log(err)
        //     return {
        //         code: 'xxx',
        //         message: err.message,
        //         status: 'error'
        //     }
        // }
    }
}

module.exports = AccessService