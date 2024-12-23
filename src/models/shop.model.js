'use strict'
import bcript from 'bcrypt' 
import { Schema , model } from 'mongoose' 

const DOCUMENT_NAME = 'Shop'
const COLECTION_NAME = 'Shops'
// Declare the Schema of the Mongo model
var ShopSchema = new Schema({
    name:{
        type:String,
        trim:true,
        maxLength: 150
    },
    email:{
        type:String,
        unique:true,
        trim:true,
    },  
    password:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum: ['active','inactive'],
        default: 'inactive'
    },
    verify:{
        type:Schema.Types.Boolean,
        default: 'false'
    },
    roles: {
        type: Array,
        default: []
    }
}, {
    timestamps: true,
    collection: COLECTION_NAME
});

ShopSchema.pre('save', async function(next) {
    if(this.isModified('password') || this.isNew) {
        this.password = await bcript.hash(this.password,10)
    }
    next();
})

const Shop = model(DOCUMENT_NAME, ShopSchema);
//Export the model
export default Shop