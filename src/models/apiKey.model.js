'use strict'

//key !dmbg install by Mongo Snippets for Node-js 
const { model, Schema, Types } = require('mongoose');

const DOCUMENT_NAME = 'ApiKey'
const COLLECTION_NAME = 'ApiKeys'

//Declare the schema 
const apiKeySchema = new Schema({
    key: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: Boolean,
        default: true
    },
    permissions: {
        type: [String],
        required: true,
        enum: ['0000', '1111', '2222']
    },

}, {
    timestamps: true,
    collection: COLLECTION_NAME
})

const ApiKey = model(DOCUMENT_NAME, apiKeySchema);

module.exports = ApiKey;