"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AdminController_1 = require("../controllers/AdminController");
const GlobalMiddleWare_1 = require("../middlewares/GlobalMiddleWare");
const Utils_1 = require("../utils/Utils");
const AdminValidators_1 = require("./validators/AdminValidators");
class AdminRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get('/data', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, AdminController_1.AdminController.data);
        this.router.get('/all', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, AdminController_1.AdminController.all);
        this.router.get('/login', AdminValidators_1.AdminValidators.login(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, AdminController_1.AdminController.login);
    }
    postRoutes() {
        this.router.post('/create', new Utils_1.Utils().adminMulter.fields([{ name: 'profile_pic' }]), AdminValidators_1.AdminValidators.create(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, AdminController_1.AdminController.create);
    }
    patchRoutes() {
        this.router.patch('/update', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, new Utils_1.Utils().adminMulter.fields([{ name: 'profile_pic' }]), GlobalMiddleWare_1.GlobalMiddleWare.checkError, AdminController_1.AdminController.update);
    }
    deleteRoutes() {
    }
}
exports.default = new AdminRouter().router;
