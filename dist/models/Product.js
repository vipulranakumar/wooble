"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const Utils_1 = require("../utils/Utils");
const ProductSchema = new mongoose.Schema({
    product_category_id: { type: mongoose.Types.ObjectId, required: true, ref: 'product_categorys' },
    name: { type: String, required: true },
    slug: { type: String, required: true },
    bg_color: { type: String, required: false },
    image: { type: String, required: false },
    limited_edition_status: { type: Boolean, required: true, default: false },
    login_image: { type: String, required: false },
    login_password: { type: String, required: false },
    heading: { type: String, required: true },
    heading_description: { type: String, required: true },
    yt_url: { type: String, required: false },
    tutorial_video_status: { type: Boolean, required: true, default: false },
    tutorial_video: { type: String, required: false },
    html_content: { type: String, required: true },
    seo_title: { type: String, required: false },
    seo_keywords: { type: String, required: false },
    seo_description: { type: String, required: false },
    sequence: { type: Number, required: false },
    status: { type: Boolean, required: true, default: true },
    created_at: { type: Date, required: true, default: Utils_1.Utils.indianTimeZone },
    updated_at: { type: Date, required: true, default: Utils_1.Utils.indianTimeZone },
}, { id: false });
ProductSchema.set('toObject', { virtuals: true });
ProductSchema.set('toJSON', { virtuals: true });
ProductSchema.virtual('portfolios', {
    ref: 'product_portfolios',
    localField: '_id',
    foreignField: 'product_id',
    //justOne: true
    //count: true
});
exports.default = (0, mongoose_1.model)('products', ProductSchema);
