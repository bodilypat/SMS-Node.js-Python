//src/pages/Customers.jsx 

import React, { useEffect, useState } from 'react';
import APi from '../api/axiosInstance';

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await APi.get('/customers');
            setCustomers(response.data.data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await APi.post('/customers', form);
            fetchCustomers();
            setForm({ name: '', email: '', phone: '', address: '' });
        } catch (error) {
            console.error('Error adding customer:', error);
        }
    };

    return (
        <div>
            <h1>Customers</h1>
            <form onSubmit={handleSubmit}>
                <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
                <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" required />  
                <input name="address" value={form.address} onChange={handleChange} placeholder="Address" />
                <button type="submit">Add Customer</button>
            </form>
            <ul>
                {customers.map(customer => (
                    <li key={customer._id}>{customer.name} - {customer.email} - {customer.phone} - {customer.address}</li>
                ))}
            </ul>
        </div>
    );
};

export default Customers;
