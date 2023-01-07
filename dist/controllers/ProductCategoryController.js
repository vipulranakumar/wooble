"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductCategoryController = void 0;
const ProductCategory_1 = require("../models/ProductCategory");
class ProductCategoryController {
    static Create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let productCategory = yield new ProductCategory_1.default(req.body).save();
                res.json({
                    message: 'Product Category Save Successfully',
                    data: productCategory,
                    status_code: 200
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static Update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const productCategoryId = req.productCategory._id;
            try {
                const productCategory = yield ProductCategory_1.default.findOneAndUpdate({ _id: productCategoryId }, req.body, { new: true, useFindAndModify: false });
                res.send(productCategory);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static Category(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const productCategory = req.productCategory;
            const data = {
                message: 'Success',
                data: productCategory
            };
            res.json(data);
        });
    }
    static AllCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productCategory = yield ProductCategory_1.default.find({ status: true }, { category: 1 }).sort({ sequence: 1 }).populate({ path: 'products', select: ['slug', 'name', 'image'], options: { sort: { 'sequence': 1 } } });
                const data = {
                    message: 'Success',
                    data: productCategory
                };
                res.json(data);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static AllAdminCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productCategory = yield ProductCategory_1.default.find().sort({ sequence: 1 }).populate({ path: 'products', select: ['slug', 'name', 'image', '-product_category_id'], options: { sort: { 'sequence': 1 } } });
                const data = {
                    message: 'Success',
                    data: productCategory
                };
                res.json(data);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static Delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const productCategory = req.productCategory;
            try {
                yield productCategory.remove();
                res.json({
                    message: 'Success ! Product Category Deleted Successfully',
                    status_code: 200
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.ProductCategoryController = ProductCategoryController;
