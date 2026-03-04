//src/models/Product.js 

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: { 
        type: String, 
        required: true,
        trim: true
    },
    barcode: {
        type: String,
        unique: true,
        trim: true
    },
    purchasePrice: {
        type: Number,
        required: true,
        min: 0
    },
    sellingPrice: {
        type: Number,
        required: true,
        min: 0
    },
    stockQuantity: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        trim: true
    },
    image: {
        type: String,
    },
    lowStockThreshold: {
        type: Number,
        default: 10,
        min: 0
    },
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier'
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
