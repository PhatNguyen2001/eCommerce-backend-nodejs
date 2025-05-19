import KeyToken from "../models/keyToken.model.js"
import JWT from 'jsonwebtoken'
import _ from 'lodash'

export async function createKeyToken(userId, publicKey, privateKey) {
    try {
        // const publicKeyString = publicKey.toString()
        const token = await KeyToken.create({
            user: userId,
            // publicKey: publicKeyString,
            publicKey,
            privateKey
        })

        // console.log('tokenssadas',token.publicKey)
        return token ? token.publicKey : null 
    }catch(err) {
        return err
    }
}

export async function createTokenPair(payload, publicKey, privateKey) {
    // const accessToken = await JWT.sign(payload,private, {
    //     algorithm: 'RS256',
    //     expiresIn: '2 days'
    // })

    // const refreshToken = await JWT.sign(payload,privateKey, {
    //     algorithm: 'RS256',
    //     expiresIn: '7 days'
    // })
    const accessToken = await JWT.sign(payload,publicKey, {
        // algorithm: 'RS256',
        expiresIn: '2 days'
    })

    const refreshToken = await JWT.sign(payload,privateKey, {
        // algorithm: 'RS256',
        expiresIn: '7 days'
    })

    const jwt =  JWT.verify(accessToken,publicKey)
    console.log('JWT::',jwt)
    const jwtRefresh =  JWT.verify(refreshToken,privateKey)
    console.log('refreshToken::',jwtRefresh)
    return { accessToken, refreshToken }
}

export function getInfoData({fileds = [], object = {}}) {
    return _.pick(object,fileds)
}
