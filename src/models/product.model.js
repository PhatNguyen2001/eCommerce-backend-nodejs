'use strict';

const { Schema, model } = require('mongoose');

const DOCUMENT_NAME = 'Product';
const COLLECTION_NAME = 'Products';

const ProductSchema = new Schema({
    product_name: {
        type: String,
        required: true,
    },
    product_thumb: {
        type: String,
        required: true,
    },
    product_description: String,
    product_price: {
        type: Number,
        required: true
    },
    product_quantity: {
        type: Number,
        required: true
    },
    product_type: {
        type: String,
        required: true,
        enum: ['Electrons', 'Clothing', 'Furniture']
    },
    product_Shop: {
        type: Schema.Types.ObjectId,
        ref: 'Shop'
    },
    product_attributes: {
        type: Schema.Types.Mixed,
        required: true
    }
}, {
    collection: COLLECTION_NAME,
    timestamps: true
});

//definde the product type = clothing
const clothingSchema = new Schema({
    brand: {
        type: String,
        required: true,
    },
    size: String,
    material: String
}, {
    collection: 'clothers',
    timestamps: true
})

//definde the product type = electronic
const electronicSchema = new Schema({
    manufacturer: {
        type: String,
        required: true,
    },
    model: String,
    color: String
}, {
    collection: 'electronics',
    timestamps: true
})

const product = model(DOCUMENT_NAME, ProductSchema);
const electronic = model('Electronics', electronicSchema)
const clothing = model('Clothings', clothingSchema)
module.exports = {
    product,
    electronic,
    clothing
}