import { Router } from "express";
import { ProductController } from "../controllers/ProductController";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";
import { Utils } from "../utils/Utils";
import { ProductValidators } from "./validators/ProductValidators";

class ProductRouter {
    public router: Router;
    constructor(){
        this.router=Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();

    }

    getRoutes(){
        this.router.get('/all', ProductController.All);
        this.router.get('/banner', ProductController.banner);
        this.router.get('/search', ProductController.Search);
        this.router.get('/login', ProductValidators.login(), GlobalMiddleWare.checkError, ProductController.login);
        this.router.get('/admin/all', GlobalMiddleWare.adminAuthenticate, ProductController.adminAll);
        this.router.get('/product_category/:id', ProductValidators.Product_category(), GlobalMiddleWare.checkError, ProductController.ProductCategory);
        this.router.get('/:slug', ProductValidators.Product(), GlobalMiddleWare.checkError, ProductController.Product);
    }
    postRoutes(){
        this.router.post('/create', GlobalMiddleWare.adminAuthenticate, new Utils().ProductMulter.fields([{ name: 'image'},{ name: 'login_image'},{ name: 'tutorial_video'}]), ProductValidators.create(), GlobalMiddleWare.checkError, ProductController.Create);
    }
    patchRoutes(){
        this.router.patch('/update/:id', GlobalMiddleWare.adminAuthenticate, new Utils().ProductMulter.fields([{ name: 'image'},{ name: 'login_image'},{ name: 'tutorial_video'}]), ProductValidators.update(), GlobalMiddleWare.checkError, ProductController.Update);
    }
    deleteRoutes(){
        this.router.delete('/delete/:id', GlobalMiddleWare.adminAuthenticate, ProductValidators.delete(), GlobalMiddleWare.checkError,ProductController.Delete)
    }
}

export default new ProductRouter().router;