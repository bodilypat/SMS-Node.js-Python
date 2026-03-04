//src/Sale.js

const mongoose = require('mongoose');

const saleItemSchema = new mongoose.Schema({
    customer_id: {  
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    saleDate: {
        type: Date,
        default: Date.now
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
            unitPrice: {
                type: Number,
                required: true,
                min: 0
            },
            totalPrice: {
                type: Number,
                required: true,
                min: 0
            }
        }
    ],
    totalAmount: Number,
    tax: String,
    quantity: Number,
    grandTotal: Number,
}, { timestamps: true });

module.exports = mongoose.model('Sale', saleItemSchema);
