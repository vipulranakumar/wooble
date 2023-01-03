import { Router } from "express";
import { AdminController } from "../controllers/AdminController";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";
import { Utils } from "../utils/Utils";
import { AdminValidators } from "./validators/AdminValidators";

class AdminRouter {
    public router: Router;
    constructor(){
        this.router=Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();

    } 

    getRoutes(){
        this.router.get('/data', GlobalMiddleWare.adminAuthenticate, AdminController.data);
        this.router.get('/all', GlobalMiddleWare.adminAuthenticate, AdminController.all);
        this.router.get('/login', AdminValidators.login(), GlobalMiddleWare.checkError, AdminController.login);
    }
    postRoutes(){
        this.router.post('/create', new Utils().adminMulter.fields([{ name: 'profile_pic'}]), AdminValidators.create(), GlobalMiddleWare.checkError, AdminController.create);
    }
    patchRoutes(){
        this.router.patch('/update', GlobalMiddleWare.adminAuthenticate, new Utils().adminMulter.fields([{ name: 'profile_pic'}]), GlobalMiddleWare.checkError, AdminController.update);
    }
    deleteRoutes(){
    }
}

export default new AdminRouter().router;