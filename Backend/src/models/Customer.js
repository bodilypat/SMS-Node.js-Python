//src/models/Customer.js 

/* 
/ customers Collection
{
    "_id": ObjectId("..."),
    "full_name": "",
    "email": "",
    "phone_number": "",
    "created_at": ISODate("")
} */

const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    full_name: { 
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    phone_number: {
        type: String,
        required: true,
        trim: true
    }, 
    address: String,
    loyaltyPoints: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Customer', customerSchema);
