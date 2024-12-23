'use strict'

import { Schema , model } from 'mongoose' // Erase if already required
const DOCUMENT_NAME = 'Key'
const COLLECTION_NAME = 'Keys'
// Declare the Schema of the Msongo model
var KeyTokenSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        require: true,
        ref: 'Shop'
    },
    privateKey:{
        type:String,
        require: true,
    }, //
    publicKey:{
        type:String,
        require: true,
    },
    refreshToken: {
        type: Array,
        default: []
    }
},{
    collection: COLLECTION_NAME,
    timestamps: true
});

//Export the model
const KeyToken =  model(DOCUMENT_NAME,KeyTokenSchema);
export default KeyToken