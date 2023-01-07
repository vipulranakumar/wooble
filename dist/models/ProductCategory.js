"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const Utils_1 = require("../utils/Utils");
const ProductCategorySchema = new mongoose.Schema({
    category: { type: String, required: true },
    sequence: { type: Number, required: false },
    status: { type: Boolean, required: true, default: true },
    created_at: { type: Date, default: Utils_1.Utils.indianTimeZone },
    updated_at: { type: Date, default: Utils_1.Utils.indianTimeZone },
}, { id: false });
ProductCategorySchema.set('toObject', { virtuals: true });
ProductCategorySchema.set('toJSON', { virtuals: true });
ProductCategorySchema.virtual('products', {
    ref: 'products',
    localField: '_id',
    foreignField: 'product_category_id',
});
exports.default = (0, mongoose_1.model)('product_categorys', ProductCategorySchema);
