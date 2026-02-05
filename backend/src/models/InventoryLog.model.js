//src/models/InventoryLog.model.js 

import mongoose from 'mongoose';

const InventoryLogSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },

    changeType: {
        type: String,
        enum: ['STOCK_IN', 'STOCK_OUT', 'ADJUSTMENT'],
        required: true,
    },

    quantityBefore: { type: Number, required: true },
    quantityChanged: { type: Number, required: true },
    quantityAfter: { type: Number, required: true },

    referenceId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: false
    },

    performedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    performedAt: { type: Date, default: Date.now }
}, {
    timestamps: true
});
export default mongoose.model('InventoryLog', InventoryLogSchema);

