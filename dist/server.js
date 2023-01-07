"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const env_1 = require("./environments/env");
const ProductCategoryRouter_1 = require("./routers/ProductCategoryRouter");
const ProductRouter_1 = require("./routers/ProductRouter");
const AdminRouter_1 = require("./routers/AdminRouter");
class Server {
    constructor() {
        this.app = express();
        // other 
        this.setConfigurations();
        this.setRoutes();
        this.error404Handler();
        this.handleErrors();
    }
    setConfigurations() {
        this.connectMongodb();
        this.configureBodyParser();
    }
    connectMongodb() {
        const databaseUrl = (0, env_1.getEnvironmentVariables)().db_url;
        mongoose.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            console.log('mongoDb Connected');
        });
    }
    configureBodyParser() {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        //this.app.use(app.bodyParser({limit: '50mb'}));
        //this.app.use(bodyParser.json());
    }
    setRoutes() {
        //this.app.use(express.json());
        this.app.use(cors());
        this.app.use('/api/src/uploads', express.static('src/uploads'));
        this.app.use('/api/product_category', ProductCategoryRouter_1.default);
        this.app.use('/api/product', ProductRouter_1.default);
        this.app.use('/api/admin', AdminRouter_1.default);
    }
    error404Handler() {
        this.app.use((req, res) => {
            res.status(200).json({
                message: 'Not Found !' + (0, env_1.getEnvironmentVariables)().jwt_secret,
                status_code: 200
            });
        });
    }
    handleErrors() {
        this.app.use((error, req, res, next) => {
            const errorStatus = req.errorStatus || 200;
            res.status(errorStatus).json({
                message: error.message || 'Something Went Wrong. Please Try Again',
                status_code: errorStatus
            });
        });
    }
}
exports.Server = Server;
