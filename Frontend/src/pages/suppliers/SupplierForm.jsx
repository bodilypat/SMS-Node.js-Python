//src/pages/suppliers/SupplierForm.jsx  # Form to add/edit supplier

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getSupplierById, createSupplier, updateSupplier } from '../../services/supplierService';
import { toast } from 'react-toastify';

const SupplierForm  = ({ suppliers, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        company_name: '',
        contact_name: '',
        contact_email: '',
        contact_phone: '',
        address: '',
        city: '',
        country: '',
        postal_code: ''
    });
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (suppliers ) {
            const supplier = suppliers.find(s => s.id === parseInt(id));
            if (supplier) {
                setFormData({
                    company_name: supplier.company_name,
                    contact_name: supplier.contact_name,
                    contact_email: supplier.contact_email,
                    contact_phone: supplier.contact_phone,
                    address: supplier.address,
                    city: supplier.city,
                    country: supplier.country,
                    postal_code: supplier.postal_code
                });
            }
        }
    }, [id, suppliers]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await updateSupplier(id, formData);
                toast.success('Supplier updated successfully');
            } else {
                await createSupplier(formData);
                toast.success('Supplier created successfully');
            }
            onSubmit();
            navigate('/suppliers');
        } catch (error) {
            toast.error('Error saving supplier');
        }
    };

    return (
        <div className="supplier-form">
            <h2>{id ? 'Edit Supplier' : 'Add Supplier'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Company Name:</label>
                    <input
                        type="text"
                        name="company_name"
                        value={formData.company_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Contact Name:</label>
                    <input
                        type="text"
                        name="contact_name"
                        value={formData.contact_name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Contact Email:</label>
                    <input
                        type="email"
                        name="contact_email"
                        value={formData.contact_email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Contact Phone:</label>
                    <input
                        type="text"
                        name="contact_phone"
                        value={formData.contact_phone}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>City:</label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Country:</label>
                    <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Postal Code:</label>
                    <input
                        type="text"                        
                            name="postal_code"
                            value={formData.postal_code}
                            onChange={handleChange}
                    />
                </div>
                <button type="submit">{id ? 'Update' : 'Create'}</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
}

export default SupplierForm;
