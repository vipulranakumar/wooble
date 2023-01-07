"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductCategoryController_1 = require("../controllers/ProductCategoryController");
const GlobalMiddleWare_1 = require("../middlewares/GlobalMiddleWare");
const ProductCategoryValidators_1 = require("./validators/ProductCategoryValidators");
class ProductCategoryRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get('/id/:id', ProductCategoryValidators_1.ProductCategoryValidators.category(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, ProductCategoryController_1.ProductCategoryController.Category);
        this.router.get('/all', ProductCategoryController_1.ProductCategoryController.AllCategory);
        this.router.get('/admin/all', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, ProductCategoryController_1.ProductCategoryController.AllAdminCategory);
    }
    postRoutes() {
        this.router.post('/create', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, ProductCategoryValidators_1.ProductCategoryValidators.create(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, ProductCategoryController_1.ProductCategoryController.Create);
    }
    patchRoutes() {
        this.router.patch('/update/:id', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, ProductCategoryValidators_1.ProductCategoryValidators.update(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, ProductCategoryController_1.ProductCategoryController.Update);
    }
    deleteRoutes() {
        this.router.delete('/delete/:id', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, ProductCategoryValidators_1.ProductCategoryValidators.delete(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, ProductCategoryController_1.ProductCategoryController.Delete);
    }
}
exports.default = new ProductCategoryRouter().router;
