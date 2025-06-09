
'use strict'

const ProductService = require('../services/product.service')
const { SuccessResponse } = require('../core/success.response')
class ProductControler {
    createProduct = async (req, res, next) => {
        console.log(req.body.product_type)
        new SuccessResponse({
            message: 'Create new Product success!',
            metadata: await ProductService.createProduct(req.body.product_type, req.body)
        }).send(res)
    }
}

module.exports = new ProductControler 