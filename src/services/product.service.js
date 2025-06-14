'use strict'

const { product, clothing, electronic } = require('../models/product.model')
const { BadRequestError } = require('../core/error.response')

//define Factory class to create product 
class ProductFactory {
    static async createProduct(type, payload) {
        switch (type) {
            case 'Electronics':
                return new Electronics(payload).createProduct()
            case 'Clothing':
                return new Clothing(payload).createProduct()
            default:
                throw new BadRequestError('Invalid Type!')
        }
    }
}

//define base product class 
class Product {
    constructor({
        product_name,
        product_thumb,
        product_price,
        product_quantity,
        product_description,
        product_type,
        product_shop,
        product_attributes
    }) {
        this.product_name = product_name,
            this.product_thumb = product_thumb,
            this.product_price = product_price,
            this.product_quantity = product_quantity,
            this.product_description = product_description,
            this.product_type = product_type,
            this.product_shop = product_shop,
            this.product_attributes = product_attributes
    }

    async createProduct() {
        return await product.create(this)
    }
}

//Defind sub-class for different prudct type Clothing
class Clothing extends Product {
    async createProduct() {
        const newClothing = await clothing.create(this.product_attributes)
        if (!newClothing) throw new BadRequestError('create new clothing error')

        const newProduct = await super.createProduct()
        if (!newProduct) throw new BadRequestError('create new product error')

        return newProduct
    }
}

class Electronics extends Product {
    async createProduct() {
        const newElectronic = await electronic.create(this.product_attributes)
        if (!newElectronic) throw new BadRequestError('create new electronic error')

        const newProduct = await super.createProduct()
        if (!newProduct) throw new BadRequestError('create new product error')

        return newProduct
    }
}

module.exports = ProductFactory;