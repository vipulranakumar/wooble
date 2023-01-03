import ProductCategory from "../models/ProductCategory";

export class ProductCategoryController {

    static async Create(req, res, next){  

        try {
            let productCategory:any = await new ProductCategory(req.body).save();
            res.json({
                message:'Product Category Save Successfully',
                data:productCategory,
                status_code:200
            });

        } catch (e) {
            next(e)
        }
        
   
    }

    static async Update(req, res, next) {
        const productCategoryId = req.productCategory._id;
        try {
            const productCategory = await ProductCategory.findOneAndUpdate({_id: productCategoryId}, req.body, {new: true, useFindAndModify: false});
            res.send(productCategory);
        } catch (e) {
            next(e);
        }

    }

    static async Category(req, res, next){
        const productCategory = req.productCategory;
        const data = {
            message : 'Success',
            data:productCategory
        };
        res.json(data);
    }

    static async AllCategory(req, res, next){

        try {
            const productCategory = await ProductCategory.find({status:true}, {category:1}).sort({sequence:1}).populate({path:'products', select:['slug', 'name', 'image'], options: { sort: { 'sequence': 1 } } });
            const data = {
                message : 'Success',
                data:productCategory
            }; 
            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    static async AllAdminCategory(req, res, next){

        try {
            const productCategory = await ProductCategory.find().sort({sequence:1}).populate({path:'products', select:['slug', 'name', 'image','-product_category_id'], options: { sort: { 'sequence': 1 } } });
            const data = {
                message : 'Success',
                data:productCategory
            }; 
            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    static async Delete(req, res, next) {
        const productCategory = req.productCategory;
        try {
            await productCategory.remove();
            res.json({
                message:'Success ! Product Category Deleted Successfully',
                status_code: 200
            });
        } catch (e) {
            next(e);
        }
    }

} 