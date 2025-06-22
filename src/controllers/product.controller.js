
'use strict'

const ProductService = require('../services/product.service')
const ProductServiceV2 = require('../services/product.service.xxx')

const { SuccessResponse } = require('../core/success.response')
class ProductControler {
    // createProduct = async (req, res, next) => {
    //     console.log(req.body.product_type)
    //     new SuccessResponse({
    //         message: 'Create new Product success!',
    //         metadata: await ProductService.createProduct(req.body.product_type, {
    //             ...req.body,
    //             product_shop: req.user.userId
    //         })
    //     }).send(res)
    // }

    createProduct = async (req, res, next) => {
        console.log(req.body.product_type, req.user)
        new SuccessResponse({
            message: 'Create new Product success!',
            metadata: await ProductServiceV2.createProduct(req.body.product_type, {
                ...req.body,
                product_shop: req.user.userId
            })
        }).send(res)
    }
}

module.exports = new ProductControler 