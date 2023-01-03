import { body, param, query } from "express-validator";
import Admin from "../../models/Admin";

export class AdminValidators{

    static create(){

        return  [   body('email', 'email Is Required').isEmail().custom((email, {req})=>{
                        return  Admin.findOne({email:email}).then(admin => { 
                                    if(admin){
                                        throw new Error('Admin already Exist');
                                    }else{
                                        return true;
                                    }
                                })
                    }),
                    body('name', 'name is Required').isString()
                ]
        
    }

    static login() {
        return [query('email', 'Email is Required').isEmail()
            .custom((email, {req}) => {
                return Admin.findOne({email: email}).then(admin => {
                    if (admin) {
                        req.admin = admin;
                        return true;
                    } else {
                        throw  new Error('owner Does Not Exist');
                    }
                });
            }), query('password', 'Password is Required').isAlphanumeric()]
    }


} 