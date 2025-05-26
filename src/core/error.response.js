'use strict'

const STATUSCODE = {
    FORBIDDENT: 403,
    CONFLICT: 409,
    UNAUTHORIZATION: 401,
    NOTFOUND: 403
}

const REASONSTATUSCODE = {
    FORBIDENT: 'bad request error',
    CONFLICT: 'Conflict error',
    UNAUTHORIZATION: 'Unauthorization',
    NOTFOUND: 'NOT FOUND'
}

class ErrorResponse extends Error {
    constructor(message, status) {
        super(message)
        this.status = status
    }
}

class ConflictRequestErorr extends ErrorResponse {
    constructor(message = REASONSTATUSCODE.CONFLICT, status = STATUSCODE.FORBIDDENT) {
        super(message, status)
    }
}

class BadRequestError extends ErrorResponse {
    constructor(message = REASONSTATUSCODE.CONFLICT, status = STATUSCODE.FORBIDDENT) {
        super(message, status)
    }
}

class UnAuthorization extends ErrorResponse {
    constructor(message = REASONSTATUSCODE.UNAUTHORIZATION, status = STATUSCODE.UNAUTHORIZATION) {
        super(message, status)
    }
}

class NotFoundError extends ErrorResponse {
    constructor(message = REASONSTATUSCODE.NOTFOUND, status = STATUSCODE.NOTFOUND) {
        super(message, status)
    }
}

module.exports = {
    ConflictRequestErorr,
    BadRequestError,
    UnAuthorization,
    NotFoundError
}