import * as mongoose from 'mongoose';
import { model } from 'mongoose';
import { Utils } from '../utils/Utils';

const ProductCategorySchema = new mongoose.Schema({
    category                 : {type: String, required: true},
    sequence                 : {type: Number, required: false},
    status                   : {type: Boolean, required: true, default: true},
    created_at               : {type: Date, default: Utils.indianTimeZone},
    updated_at               : {type: Date, default: Utils.indianTimeZone},
},{ id : false });

ProductCategorySchema.set('toObject', { virtuals: true });
ProductCategorySchema.set('toJSON', { virtuals: true });

ProductCategorySchema.virtual('products', {   
    ref: 'products', 
    localField: '_id',
    foreignField: 'product_category_id',
});

export default model('product_categorys', ProductCategorySchema);

    