import { body, param, query } from "express-validator";
import Product from "../../models/Product";
import ProductCategory from "../../models/ProductCategory";

export class ProductValidators{

    static create(){

        return  [   body('product_category_id', 'Product Category Is Required').isAlphanumeric().custom((product_category_id, {req})=>{
                        return  ProductCategory.findOne({_id:product_category_id}).then(product_category => { 
                                    if(product_category){
                                        return true;
                                    }else{
                                        throw new Error('Product Category Not Exist');
                                    }
                                })
                    }),
                    body('name', 'name is Required').isString(),
                    body('slug', 'slug is Required').isString(),
                    body('heading', 'description is Required').isString(),
                    body('heading_description', 'heading_description is Required').isString(),
                    body('html_content', 'html_content is Required').isString(),
                ]
        
    }

    static Product() { 
        return [param('slug').custom((slug, {req}) => {
            return Product.findOne({slug: slug}, {__v: 0, login_password:0}).populate('product_category_id').then((product) => {
                if (product) {
                    req.product = product;
                    return true;
                } else {
                    throw new Error('Product Does Not Exist');
                }
            })
        })]
    }

    static login() {
        return [
            query('slug', 'slug is Required').custom((slug, {req}) => {
                return Product.findOne({slug: slug}, {__v: 0, login_password:0}).then(product => {
                    if (product) {
                        return true;
                    } else {
                        throw  new Error('Product Does Not Exist');
                    }
                });
            }), 
            query('password', 'Password is Required').isString().custom((password, {req}) => {
                return Product.findOne({login_password: password, slug:req.query.slug}, {__v: 0, login_password:0}).then(product => {
                    if (product) {
                        req.product = product;
                        return true;
                    } else {
                        throw  new Error('Wrong Password');
                    }
                });
            })
        ]
    }

    static Product_category() {
        return [param('id').custom((id, {req}) => {
            return ProductCategory.findOne({_id: id}, {__v: 0}).then((product_category) => {
                if (product_category) {
                    req.product_category = product_category;
                    return true;
                } else {
                    throw new Error('Product Category Does Not Exist');
                }
            })
        })]
    }

    static update() {
        return [param('id').custom((id, {req}) => {
            return Product.findOne({_id: id}, {__v: 0}).then((product) => {
                if (product) {
                    req.product = product;
                    return true;
                } else {
                    throw new Error('Product Does Not Exist');
                }
            })
        })]
    }

    static delete() {
        return [param('id').custom((id, {req}) => {
            return Product.findOne({_id: id}, {__v: 0}).then((product) => {
                if (product) {
                    req.product = product;
                    return true;
                } else {
                    throw new Error('Product Does Not Exist');
                }
            })
        })]
    }


}