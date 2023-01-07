"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminValidators = void 0;
const express_validator_1 = require("express-validator");
const Admin_1 = require("../../models/Admin");
class AdminValidators {
    static create() {
        return [(0, express_validator_1.body)('email', 'email Is Required').isEmail().custom((email, { req }) => {
                return Admin_1.default.findOne({ email: email }).then(admin => {
                    if (admin) {
                        throw new Error('Admin already Exist');
                    }
                    else {
                        return true;
                    }
                });
            }),
            (0, express_validator_1.body)('name', 'name is Required').isString(),
            (0, express_validator_1.body)('password', 'Password is Required').isString()
        ];
    }
    static login() {
        return [(0, express_validator_1.query)('email', 'Email is Required').isEmail()
                .custom((email, { req }) => {
                return Admin_1.default.findOne({ email: email }).then(admin => {
                    if (admin) {
                        req.admin = admin;
                        return true;
                    }
                    else {
                        throw new Error('owner Does Not Exist');
                    }
                });
            }),
            (0, express_validator_1.query)('password', 'Password is Required').isString()];
    }
}
exports.AdminValidators = AdminValidators;
