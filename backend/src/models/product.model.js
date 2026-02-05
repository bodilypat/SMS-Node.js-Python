//src/models/product.model.js 

import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    sku: { type: String, required: true, unique: true },
    description: String,
    barcode: String,
    
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },

    costPrice: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },

    quantity: { type: Number, default: 0 },
    minStockLevel: { type: Number, default: 5 },

    expiryDate: Date,
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier',
        required: true,
    },
    
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model('Product', productSchema);


