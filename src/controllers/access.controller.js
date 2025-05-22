
'use strict'

const AccessService = require('../services/access.service')
const { CREATED, OK } = require('../core/success.response')
class AccessControler {
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
}

module.exports = new AccessControler 