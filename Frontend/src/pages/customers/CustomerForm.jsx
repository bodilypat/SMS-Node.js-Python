//src/pages/customers/CustomerForm.jsx       # Form for add/edit customer

import React, { useState, useEffect } from 'react';
import customerService from '../../services/customerService';

function CustomerForm({ customer, onClose, onSubmit }) {
    const [formData, setFormData] = useState({
        customer_name: '',
        customer_email: '',
        customer_phone: '',
    });

    useEffect(() => {
        if (customer) {
            setFormData({
                customer_name: customer.customer_name || '',
                customer_email: customer.customer_email || '',
                customer_phone: customer.customer_phone || '',
            });
        }
    }, [customer]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData); // Parent handles API request 
    };

    return (
        <div className="customer-form-overlay">
            <h2 className="customer-form-title">{customer ? 'Edit Customer' : 'Add Customer'}</h2>
            <form className="customer-form" onSubmit={handleSubmit}>
                <label>Customer Name:</label>
                <input
                    type="text"
                    name="customer_name"
                    value={formData.customer_name}
                    placeholder="Enter customer name"
                    onChange={handleChange}
                />
                <label>Email:</label>
                <input
                    type="email"
                    name="customer_email"
                    value={formData.customer_email}
                    placeholder="Enter customer email"
                    onChange={handleChange}
                />
                <label>Phone:</label>
                <input
                    type="text"
                    name="customer_phone"
                    value={formData.customer_phone}
                    placeholder="Enter customer phone"
                    onChange={handleChange}
                />
                <div className="form-buttons">
                    <button type="submit" className="save-btn">
                        {customer ? 'Update' : 'Create'}
                    </button>
                    <button type="button" className="cancel-btn" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CustomerForm;
