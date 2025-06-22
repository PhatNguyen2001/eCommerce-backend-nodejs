
'use strict'

const AccessService = require('../services/access.service')
const { CREATED, OK, SuccessResponse } = require('../core/success.response')
class AccessControler {
    login = async (req, res, next) => {
        new SuccessResponse({
            metadata: await AccessService.login(req.body)
        }).send(res)
    }

    logout = async (req, res, next) => {
        new SuccessResponse({
            metadata: await AccessService.logout(req.keyStore)
        }).send(res)
    }

    signUp = async (req, res, next) => {
        new CREATED({
            message: 'Register OK',
            metadata: await AccessService.signUp(req.body),
            options: {
                limit: 10,
                page: 1
            }
        }).send(res)
    }

    handlerRefreshToken = async (req, res, next) => {
        //for authenticate v1
        // new SuccessResponse({
        //     message: 'Get Token Sucess',
        //     metadata: await AccessService.handlerRefreshToken(req.body.refreshToken)
        // }).send(res)

        //for authenticate v2
        new SuccessResponse({
            message: 'Get Token Sucess',
            metadata: await AccessService.handlerRefreshTokenV2({
                refreshToken: req.headers['refreshtoken'] || req.body.refreshToken,
                user: req.user,
                keyStore: req.keyStore
            })
        }).send(res)
    }
}

module.exports = new AccessControler 