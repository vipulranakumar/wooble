import { body, param, query } from "express-validator";

import ProductCategory from "../../models/ProductCategory";

export class ProductCategoryValidators{

    static create(){

        return  [ 
                    body('category', 'Audio Category Name Is Required').custom((category, {req})=>{
                        return  ProductCategory.findOne({category:category}).then(productCategory => {
                                    if(productCategory){
                                        throw new Error('Audio Category Already Exist');
                                    }else{
                                        return true;
                                    }
                                })
                    })
    
                ];
        
    }

    static category() {
        return [param('id').custom((id, {req}) => {
            return ProductCategory.findOne({_id: id}, {__v: 0}).then((productCategory) => {
                if (productCategory) {
                    req.productCategory = productCategory;
                    return true;
                } else {
                    throw new Error('Product Category Does Not Exist');
                }
            })
        })]
    }

    static update() {
        return [param('id').custom((id, {req}) => {
            return ProductCategory.findOne({_id: id}, {__v: 0}).then((productCategory) => {
                if (productCategory) {
                    req.productCategory = productCategory;
                    return true;
                } else {
                    throw new Error('Product Category Does Not Exist');
                }
            })
        })]
    }

    static delete() {
        return [param('id').custom((id, {req}) => {
            return ProductCategory.findOne({_id: id}, {__v: 0}).then((productCategory) => {
                if (productCategory) {
                    req.productCategory = productCategory;
                    return true;
                } else {
                    throw new Error('Product Category Does Not Exist');
                }
            })
        })]
    }


}