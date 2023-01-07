"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductCategoryValidators = void 0;
const express_validator_1 = require("express-validator");
const ProductCategory_1 = require("../../models/ProductCategory");
class ProductCategoryValidators {
    static create() {
        return [
            (0, express_validator_1.body)('category', 'Audio Category Name Is Required').custom((category, { req }) => {
                return ProductCategory_1.default.findOne({ category: category }).then(productCategory => {
                    if (productCategory) {
                        throw new Error('Audio Category Already Exist');
                    }
                    else {
                        return true;
                    }
                });
            })
        ];
    }
    static category() {
        return [(0, express_validator_1.param)('id').custom((id, { req }) => {
                return ProductCategory_1.default.findOne({ _id: id }, { __v: 0 }).then((productCategory) => {
                    if (productCategory) {
                        req.productCategory = productCategory;
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
                return ProductCategory_1.default.findOne({ _id: id }, { __v: 0 }).then((productCategory) => {
                    if (productCategory) {
                        req.productCategory = productCategory;
                        return true;
                    }
                    else {
                        throw new Error('Product Category Does Not Exist');
                    }
                });
            })];
    }
    static delete() {
        return [(0, express_validator_1.param)('id').custom((id, { req }) => {
                return ProductCategory_1.default.findOne({ _id: id }, { __v: 0 }).then((productCategory) => {
                    if (productCategory) {
                        req.productCategory = productCategory;
                        return true;
                    }
                    else {
                        throw new Error('Product Category Does Not Exist');
                    }
                });
            })];
    }
}
exports.ProductCategoryValidators = ProductCategoryValidators;
