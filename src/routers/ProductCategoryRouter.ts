import { Router } from "express";
import { ProductCategoryController } from "../controllers/ProductCategoryController";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";
import { Utils } from "../utils/Utils";
import { ProductCategoryValidators } from "./validators/ProductCategoryValidators";

class ProductCategoryRouter {
    public router: Router;
    constructor(){
        this.router=Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();

    }

    getRoutes(){
        this.router.get('/id/:id', ProductCategoryValidators.category(), GlobalMiddleWare.checkError, ProductCategoryController.Category);
        this.router.get('/all', ProductCategoryController.AllCategory);
        this.router.get('/admin/all', GlobalMiddleWare.adminAuthenticate, ProductCategoryController.AllAdminCategory);
    }
    postRoutes(){
        this.router.post('/create', GlobalMiddleWare.adminAuthenticate, ProductCategoryValidators.create(), GlobalMiddleWare.checkError, ProductCategoryController.Create);
    }
    patchRoutes(){
        this.router.patch('/update/:id', GlobalMiddleWare.adminAuthenticate, ProductCategoryValidators.update(), GlobalMiddleWare.checkError, ProductCategoryController.Update);
    }
    deleteRoutes(){
        this.router.delete('/delete/:id', GlobalMiddleWare.adminAuthenticate, ProductCategoryValidators.delete(), GlobalMiddleWare.checkError,ProductCategoryController.Delete)
    }
}

export default new ProductCategoryRouter().router;