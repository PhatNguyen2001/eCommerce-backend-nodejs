'use strict'

const STATUSCODE = {
    OK: 200,
    CREATED: 201
}

const REASONSTATUSCODE = {
    OK: 'Success',
    CREATED: 'Created'
}

class SuccessResponse {
    constructor({ message, status = STATUSCODE.OK, reason = REASONSTATUSCODE.OK, metadata = {} }) {
        this.message = message ?? reason
        this.status = status
        this.metadata = metadata
    }

    send(res, header = {}) {
        return res.status(this.status).json(this)
    }
}

class OK extends SuccessResponse {
    constructor({ message, metadata }) {
        super({ message, metadata })
    }
}

class CREATED extends SuccessResponse {
    constructor({ message, status = STATUSCODE.CREATED, reason = REASONSTATUSCODE.CREATED, metadata, options = {} }) {
        super({ message, metadata, status, reason })
        this.options = options
    }
}

module.exports = {
    OK,
    CREATED
}