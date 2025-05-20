'use strict'
const shopModel = require('../models/shop.model')
const KeyToken = require('../models/keyToken.model')
const crypto = require('crypto')
const KeyTokenService = require('../services/keyToken.service')
const { createTokenPair } = require('../auth/authUtils')
const getInfoData = require('../utils/index')
const RoleShop = {
    SHOP: 'SHOP',
    WRITE: 'WRITTER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN'
}

class AccessService {
    static signUp = async ({ name, email, password }) => {
        // const { name, email, password } = req.body

        try {
            const shop = await shopModel.findOne({ email }).lean()

            if (shop) {
                return {
                    code: 'xxxx',
                    message: 'Shop already registered!'
                }
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
                    return {
                        code: 'xxx',
                        message: 'Public key string err!'
                    }
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
        } catch (err) {
            console.log(err)
            return {
                code: 'xxx',
                message: err.message,
                status: 'error'
            }
        }
    }
}

module.exports = AccessService