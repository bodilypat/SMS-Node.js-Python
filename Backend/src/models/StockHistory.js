//src/models/StockHistory.js 

const mongoose = require('mongoose');

const stockHistorySchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    changeType: {
        type: String,
        enum: ['addition', 'removal'],
        required: true
    },
    quantityChanged: {
        type: Number,
        required: true
    },
    previousStock: {
        type: Number,
        required: true
    },
    newStock: {
        type: Number,
        required: true
    },
    referenceId: String,
}, { timestamps: true });

module.exports = mongoose.model('StockHistory', stockHistorySchema);

