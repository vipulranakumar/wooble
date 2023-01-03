import * as mongoose from 'mongoose';
import { model } from 'mongoose';
import { Utils } from '../utils/Utils';

const ProductSchema = new mongoose.Schema({
    product_category_id      : {type: mongoose.Types.ObjectId, required: true, ref: 'product_categorys'},
    name                     : {type: String, required: true},
    slug                     : {type: String, required: true},
    bg_color                 : {type: String, required: false},
    image                    : {type: String, required: false},
    limited_edition_status   : {type: Boolean, required: true, default: false},

    login_image              : {type: String, required: false},
    login_password           : {type: String, required: false},

    heading                  : {type: String, required: true},
    heading_description      : {type: String, required: true},
    yt_url                   : {type: String, required: false},
    tutorial_video           : {type: String, required: false},
    html_content             : {type: String, required: true},
    
    seo_title                : {type: String, required: false},
    seo_keywords             : {type: String, required: false},
    seo_description          : {type: String, required: false},

    sequence                 : {type: Number, required: false},
    status                   : {type: Boolean, required: true, default: true},
    created_at               : {type: Date, required: true, default: Utils.indianTimeZone},
    updated_at               : {type: Date, required: true, default: Utils.indianTimeZone},
},{ id : false });

ProductSchema.set('toObject', { virtuals: true });
ProductSchema.set('toJSON', { virtuals: true });

ProductSchema.virtual('portfolios', {   
    ref: 'product_portfolios', 
    localField: '_id',
    foreignField: 'product_id',
    //justOne: true
    //count: true
});

export default model('products', ProductSchema);

