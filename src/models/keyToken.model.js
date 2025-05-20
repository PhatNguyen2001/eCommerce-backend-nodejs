'use strict';

const { Schema, model } = require('mongoose'); // Thay import thành require

const DOCUMENT_NAME = 'Key';
const COLLECTION_NAME = 'Keys';

const KeyTokenSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Shop'
    },
    privateKey: {
        type: String,
        required: true,
    },
    publicKey: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: Array,
        default: []
    }
}, {
    collection: COLLECTION_NAME,
    timestamps: true
});

const KeyToken = model(DOCUMENT_NAME, KeyTokenSchema);
module.exports = KeyToken;