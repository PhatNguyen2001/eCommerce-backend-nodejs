'use strict'

const { product, clothing, electronic, furniture } = require('../models/product.model')
const { BadRequestError } = require('../core/error.response')

//define Factory class to create product 
class ProductFactory {
    static productRegistered = {}

    static registerProductType(type, classRef) {
        ProductFactory.productRegistered[type] = classRef
    }

    static async createProduct(type, payload) {
        const productClass = ProductFactory.productRegistered[type]
        if (!productClass) {
            throw new BadRequestError('Invalid Type!')
        }
        return new productClass(payload).createProduct()
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

    async createProduct(product_id) {
        return await product.create({ ...this, _id: product_id })
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
        const newElectronic = await electronic.create({
            ...this.product_attributes,
            product_shop: this.product_shop,
        })
        if (!newElectronic) throw new BadRequestError('create new electronic error')

        const newProduct = await super.createProduct(newElectronic.id)
        if (!newProduct) throw new BadRequestError('create new product error')

        return newProduct
    }
}

class Furniture extends Product {
    async createProduct() {
        const newFurniture = await furniture.create({
            ...this.product_attributes,
            product_shop: this.product_shop,
        })
        if (!newFurniture) throw new BadRequestError('create new furniture error')

        const newProduct = await super.createProduct(newFurniture.id)
        if (!newProduct) throw new BadRequestError('create new product error')

        return newProduct
    }
}

//register product type
ProductFactory.registerProductType('Clothing', Clothing)
ProductFactory.registerProductType('Electronics', Electronics)
ProductFactory.registerProductType('Furniture', Furniture)

module.exports = ProductFactory;