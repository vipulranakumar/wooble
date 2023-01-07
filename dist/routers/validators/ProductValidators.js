"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidators = void 0;
const express_validator_1 = require("express-validator");
const Product_1 = require("../../models/Product");
const ProductCategory_1 = require("../../models/ProductCategory");
class ProductValidators {
    static create() {
        return [(0, express_validator_1.body)('product_category_id', 'Product Category Is Required').isAlphanumeric().custom((product_category_id, { req }) => {
                return ProductCategory_1.default.findOne({ _id: product_category_id }).then(product_category => {
                    if (product_category) {
                        return true;
                    }
                    else {
                        throw new Error('Product Category Not Exist');
                    }
                });
            }),
            (0, express_validator_1.body)('name', 'name is Required').isString(),
            (0, express_validator_1.body)('slug', 'slug is Required').isString(),
            (0, express_validator_1.body)('heading', 'description is Required').isString(),
            (0, express_validator_1.body)('heading_description', 'heading_description is Required').isString(),
            (0, express_validator_1.body)('html_content', 'html_content is Required').isString(),
        ];
    }
    static Product() {
        return [(0, express_validator_1.param)('slug').custom((slug, { req }) => {
                return Product_1.default.findOne({ slug: slug }, { __v: 0, login_password: 0 }).populate('product_category_id').then((product) => {
                    if (product) {
                        req.product = product;
                        return true;
                    }
                    else {
                        throw new Error('Product Does Not Exist');
                    }
                });
            })];
    }
    static login() {
        return [
            (0, express_validator_1.query)('slug', 'slug is Required').custom((slug, { req }) => {
                return Product_1.default.findOne({ slug: slug }, { __v: 0, login_password: 0 }).then(product => {
                    if (product) {
                        return true;
                    }
                    else {
                        throw new Error('Product Does Not Exist');
                    }
                });
            }),
            (0, express_validator_1.query)('password', 'Password is Required').isString().custom((password, { req }) => {
                return Product_1.default.findOne({ login_password: password, slug: req.query.slug }, { __v: 0, login_password: 0 }).then(product => {
                    if (product) {
                        req.product = product;
                        return true;
                    }
                    else {
                        throw new Error('Wrong Password');
                    }
                });
            })
        ];
    }
    static Product_category() {
        return [(0, express_validator_1.param)('id').custom((id, { req }) => {
                return ProductCategory_1.default.findOne({ _id: id }, { __v: 0 }).then((product_category) => {
                    if (product_category) {
                        req.product_category = product_category;
                        return true;
                    }
                    else {
                        throw new Error('Product Category Does Not Exist');
                    }
                });
            })];
    }
    static update() {
        return [(0, express_validator_1.param)('id').custom((id, { req }) => {
                return Product_1.default.findOne({ _id: id }, { __v: 0 }).then((product) => {
                    if (product) {
                        req.product = product;
                        return true;
                    }
                    else {
                        throw new Error('Product Does Not Exist');
                    }
                });
            })];
    }
    static delete() {
        return [(0, express_validator_1.param)('id').custom((id, { req }) => {
                return Product_1.default.findOne({ _id: id }, { __v: 0 }).then((product) => {
                    if (product) {
                        req.product = product;
                        return true;
                    }
                    else {
                        throw new Error('Product Does Not Exist');
                    }
                });
            })];
    }
}
exports.ProductValidators = ProductValidators;
