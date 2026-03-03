//src/pages/customers/Customers.jsx      # Main customers page (list & actions)

import React, { useState, useEffect } from 'react';
import customerService from '../../services/customerService';
import CustomerList from './CustomerRow';
import CustomerForm from './CustomerForm';
import './customers.css';

function Customers() {
    const [customers, setCustomers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState(null);

    const fetchCustomers = async () => {
        try {
            const response = await customerService.getCustomers();
            setCustomers(response.data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleFormSubmit = async (customerData) => {
        try {
            if (editingCustomer) {
                await customerService.updateCustomer(editingCustomer.id, customerData);
            } else {
                await customerService.createCustomer(customerData);
            }
            setShowForm(false);
            setEditingCustomer(null);
            fetchCustomers();
        } catch (error) {
            console.error('Error saving customer:', error);
        }
    };

    const handleEdit = (customer) => {
        setEditingCustomer(customer);
        setShowForm(true);
    };

    const handleDelete = async (customerId) => {
        if (!window.confirm('Are you sure you want to delete this customer?')) {
            return;
        }
        try {
            await customerService.deleteCustomer(customerId);
            fetchCustomers();
        } catch (error) {
            console.error('Error deleting customer:', error);
        }   
    };

    return (
        <div className="customers-container">
           <h1>Customers</h1>
            <button 
                className="add-customer-btn"
                onClick={() => {
                    setEditingCustomer(null);
                    setShowForm(true);
                }}
            >
                Add Customer
            </button>
            <CustomerList
                customers={customers}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
            {showForm && (
                <CustomerForm
                    customer={editingCustomer}
                    onSubmit={handleFormSubmit}
                    onCancel={() => {
                        setShowForm(false);
                        setEditingCustomer(null);
                    }}
                />
            )}
        </div>
    );
}

export default Customers;

