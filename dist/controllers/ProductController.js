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
exports.ProductController = void 0;
const Product_1 = require("../models/Product");
const fs = require("fs");
class ProductController {
    static Create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let fileObject = {};
            if (req.files.image) {
                const imageUrl = req.files.image[0].path.replace(/\\/g, "/");
                fileObject.image = imageUrl;
            }
            if (req.files.login_image) {
                const login_imageUrl = req.files.login_image[0].path.replace(/\\/g, "/");
                fileObject.login_image = login_imageUrl;
            }
            if (req.files.tutorial_video) {
                const tutorial_videoUrl = req.files.tutorial_video[0].path.replace(/\\/g, "/");
                fileObject.tutorial_video = tutorial_videoUrl;
            }
            var insert = Object.assign(Object.assign({}, req.body), fileObject);
            try {
                let product = yield new Product_1.default(insert).save();
                res.json({
                    message: 'Product Save Successfully',
                    data: product,
                    status_code: 200
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static Product(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = req.product;
            const data = {
                message: 'Success',
                data: product
            };
            res.json(data);
        });
    }
    static ProductCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield Product_1.default.find({ product_category_id: req.product_category._id }, { __v: 0 });
                const data = {
                    message: 'Success',
                    category: req.product_category,
                    data: product
                };
                res.json(data);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static All(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.query.limit) {
                    var product = yield Product_1.default.find({ status: true }, { login_password: 0 }).limit(parseInt(req.query.limit)).sort({ sequence: 1 }).populate('product_category_id');
                }
                else {
                    var product = yield Product_1.default.find({ status: true }, { login_password: 0 }).sort({ sequence: 1 }).populate('product_category_id');
                }
                const data = {
                    message: 'Success',
                    data: product
                };
                res.json(data);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static Search(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.query.keyword) {
                    var product = yield Product_1.default.find({ name: { $regex: '.*' + req.query.keyword + '.*', $options: 'i' }, status: true }, { login_password: 0 }).limit(parseInt(req.query.limit)).sort({ sequence: 1 }).populate('product_category_id');
                }
                else {
                    var product = yield Product_1.default.find({ status: true }, { login_password: 0 }).sort({ sequence: 1 }).populate('product_category_id');
                }
                const data = {
                    message: 'Success',
                    data: product
                };
                res.json(data);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = req.product;
            const data = {
                message: 'Success',
                data: product
            };
            res.json(data);
        });
    }
    static adminAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield Product_1.default.find({}, { __v: 0 }).sort({ sequence: 1 }).populate({ path: 'product_category_id' });
                const data = {
                    message: 'Success',
                    data: product
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
            const product = req.product;
            try {
                if (product['image']) {
                    yield fs.unlink(product['image'], (err) => __awaiter(this, void 0, void 0, function* () {
                        if (err)
                            throw err;
                    }));
                }
                if (product['login_image']) {
                    yield fs.unlink(product['login_image'], (err) => __awaiter(this, void 0, void 0, function* () {
                        if (err)
                            throw err;
                    }));
                }
                if (product['tutorial_video']) {
                    yield fs.unlink(product['tutorial_video'], (err) => __awaiter(this, void 0, void 0, function* () {
                        if (err)
                            throw err;
                    }));
                }
                yield product.remove();
                res.json({
                    message: 'Success ! Product Deleted Successfully',
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
            const productId = req.product._id;
            const product = req.product;
            let fileObject = {};
            if (req.files.image) {
                yield fs.unlink(product['image'], (err) => __awaiter(this, void 0, void 0, function* () {
                    if (err)
                        throw err;
                }));
                const imageUrl = req.files.image[0].path.replace(/\\/g, "/");
                fileObject.image = imageUrl;
            }
            if (req.files.login_image) {
                yield fs.unlink(product['login_image'], (err) => __awaiter(this, void 0, void 0, function* () {
                    if (err)
                        throw err;
                }));
                const login_imageUrl = req.files.login_image[0].path.replace(/\\/g, "/");
                fileObject.login_image = login_imageUrl;
            }
            if (req.files.tutorial_video) {
                yield fs.unlink(product['tutorial_video'], (err) => __awaiter(this, void 0, void 0, function* () {
                    if (err)
                        throw err;
                }));
                const tutorial_videoUrl = req.files.tutorial_video[0].path.replace(/\\/g, "/");
                fileObject.tutorial_video = tutorial_videoUrl;
            }
            var update = Object.assign(Object.assign(Object.assign({}, req.body), fileObject), { updated_at: new Date() });
            try {
                const product = yield Product_1.default.findOneAndUpdate({ _id: productId }, update, { new: true, useFindAndModify: false });
                res.send(product);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.ProductController = ProductController;
