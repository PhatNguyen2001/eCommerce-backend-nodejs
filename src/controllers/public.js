import shopModel from "../models/shop.model.js"
import KeyToken from "../models/keyToken.model.js"
import crypto from 'crypto'
import { createKeyToken, createTokenPair, getInfoData } from '../utils/helper.js'
import { token } from "morgan"
import { format } from "path"

const RoleShop = { 
    SHOP: 'SHOP',
    WRITE: 'WRITTER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN'
}

class PublicController {
    async signUp (req, res,next) {
        const {name, email, password} = req.body 

        try {
            const shop = await shopModel.findOne({ email }).lean()
         
            if(shop) {
                return res.status(200).json({
                    code: 'xxxx',
                    message: 'Shop already registered!'
                })
            }

            const newShop = await shopModel.create({
                name,email,password,roles: [RoleShop.SHOP]
            })

            let tokens;
            if(newShop) {
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
                const keyStore = await createKeyToken(newShop.id,publicKey,privateKey)

                if(!keyStore) {
                    return {
                        code: 'xxx',
                        message: 'Public key string err!'
                    }
                }
                // const pubKeyStringObject = crypto.createPublicKey(pubKeyString)
                // tokens = await createTokenPair({userId: newShop.id, email}, pubKeyStringObject, privateKey)
                tokens = await createTokenPair({userId: newShop.id, email}, publicKey, privateKey)
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

            return res.status(201).json({
                code: '20001',
                metadata: {
                    shop: getInfoData({fileds: ['_id','name','email'],object: newShop})
                },
            })
        }catch(err) {
            next(err)
        }
    }
}

const publicController = new PublicController()
export default publicController
