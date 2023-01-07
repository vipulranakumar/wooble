"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductController_1 = require("../controllers/ProductController");
const GlobalMiddleWare_1 = require("../middlewares/GlobalMiddleWare");
const Utils_1 = require("../utils/Utils");
const ProductValidators_1 = require("./validators/ProductValidators");
class ProductRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get('/title/:slug', ProductValidators_1.ProductValidators.Product(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, ProductController_1.ProductController.Product);
        this.router.get('/all', ProductController_1.ProductController.All);
        this.router.get('/search', ProductController_1.ProductController.Search);
        this.router.get('/login', ProductValidators_1.ProductValidators.login(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, ProductController_1.ProductController.login);
        this.router.get('/admin/all', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, ProductController_1.ProductController.adminAll);
        this.router.get('/product_category/:id', ProductValidators_1.ProductValidators.Product_category(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, ProductController_1.ProductController.ProductCategory);
    }
    postRoutes() {
        this.router.post('/create', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, new Utils_1.Utils().ProductMulter.fields([{ name: 'image' }, { name: 'login_image' }, { name: 'tutorial_video' }]), ProductValidators_1.ProductValidators.create(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, ProductController_1.ProductController.Create);
    }
    patchRoutes() {
        this.router.patch('/update/:id', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, new Utils_1.Utils().ProductMulter.fields([{ name: 'image' }, { name: 'login_image' }, { name: 'tutorial_video' }]), ProductValidators_1.ProductValidators.update(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, ProductController_1.ProductController.Update);
    }
    deleteRoutes() {
        this.router.delete('/delete/:id', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, ProductValidators_1.ProductValidators.delete(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, ProductController_1.ProductController.Delete);
    }
}
exports.default = new ProductRouter().router;
