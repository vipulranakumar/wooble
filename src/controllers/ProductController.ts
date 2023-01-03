import Product from "../models/Product";
import * as fs from 'fs';

export class ProductController {

    static async Create(req, res, next){  

        let fileObject:any = {};
        if(req.files.image){
            const imageUrl:any = req.files.image[0].path.replace(/\\/g, "/");
            fileObject.image=imageUrl;
        }
        if(req.files.login_image){
            const login_imageUrl:any = req.files.login_image[0].path.replace(/\\/g, "/");
            fileObject.login_image=login_imageUrl;
        }
        if(req.files.tutorial_video){
            const tutorial_videoUrl:any = req.files.tutorial_video[0].path.replace(/\\/g, "/");
            fileObject.tutorial_video=tutorial_videoUrl;
        }

        var insert = {...req.body, ...fileObject}; 

        try {

            let product:any = await new Product(insert).save();
            res.json({
                message:'Product Save Successfully',
                data:product,
                status_code:200
            });

        } catch (e) {
            next(e)
        }
        
   
    }

    static async Product(req, res, next){
        const product = req.product;
        const data = {
            message : 'Success',
            data:product
        };
        res.json(data);
    }

    static async ProductCategory(req, res, next){

        try {
            const product = await Product.find({product_category_id:req.product_category._id}, {__v: 0});
            const data = {
                message : 'Success',
                category : req.product_category,
                data:product
            };
            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    static async All(req, res, next){

        try {
            if(req.query.limit){
                var product = await Product.find({status:true},{login_password:0}).limit(parseInt(req.query.limit)).sort({sequence:1}).populate('product_category_id');
            }else{
                var product = await Product.find({status:true},{login_password:0}).sort({sequence:1}).populate('product_category_id');
            }
            
            const data = {
                message : 'Success',
                data:product
            };
            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    static async Search(req, res, next){

        try {
            if(req.query.keyword){
                var product = await Product.find({name: { $regex: '.*' + req.query.keyword + '.*' , $options: 'i'}, status:true},{login_password:0}).limit(parseInt(req.query.limit)).sort({sequence:1}).populate('product_category_id');
            }else{
                var product = await Product.find({status:true},{login_password:0}).sort({sequence:1}).populate('product_category_id');
            }
            
            const data = {
                message : 'Success',
                data:product
            };
            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    static async adminAll(req, res, next){

        try {
            const product = await Product.find({}, {__v: 0}).sort({sequence:1}).populate({path:'product_category_id'});
            const data = {
                message : 'Success',
                data:product
            };
            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    static async Delete(req, res, next) {
        const product = req.product;
        try {
            if(product['image']){
                await fs.unlink(product['image'], async (err) => {
                    if (err) throw err;
                });
            }

            if(product['login_image']){
                await fs.unlink(product['login_image'], async (err) => {
                    if (err) throw err;
                });
            }
            if(product['tutorial_video']){
                await fs.unlink(product['tutorial_video'], async (err) => {
                    if (err) throw err;
                });
            }
            await product.remove();
            res.json({
                message:'Success ! Product Deleted Successfully',
                status_code: 200
            });
        } catch (e) {
            next(e);
        }
    }

    static async Update(req, res, next) {
        const productId = req.product._id;
        const product = req.product;
        let fileObject:any = {};
        if(req.files.image){
            await fs.unlink(product['image'], async (err) => {
                if (err) throw err;
            });
            const imageUrl:any = req.files.image[0].path.replace(/\\/g, "/");
            fileObject.image=imageUrl;
        }
        if(req.files.login_image){
            await fs.unlink(product['login_image'], async (err) => {
                if (err) throw err;
            });
            const login_imageUrl:any = req.files.login_image[0].path.replace(/\\/g, "/");
            fileObject.login_image=login_imageUrl;
        }
        if(req.files.tutorial_video){
            await fs.unlink(product['tutorial_video'], async (err) => {
                if (err) throw err;
            });
            const tutorial_videoUrl:any = req.files.tutorial_video[0].path.replace(/\\/g, "/");
            fileObject.tutorial_video=tutorial_videoUrl;
        }

        var update = {...req.body, ...fileObject, updated_at: new Date()}; 

        try {
            const product = await Product.findOneAndUpdate({_id: productId}, update, {new: true, useFindAndModify: false});
            res.send(product);
        } catch (e) {
            next(e);
        }

    }

} 