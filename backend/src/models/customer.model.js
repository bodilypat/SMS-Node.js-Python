//src/models/customer.model.js 

import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    address: { type: String },
    loyaltyPoints: { type: Number, default: 0 }     
}, { timestamps: true });
const Customer = mongoose.model('Customer', customerSchema);

export default Customer;
