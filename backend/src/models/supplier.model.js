//src/models/Supplier.model.js

import mongoose from 'mongoose';

const SupplierSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    companyName: { type: String, required: true },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

const Supplier = mongoose.model('Supplier', SupplierSchema);
export default Supplier;
