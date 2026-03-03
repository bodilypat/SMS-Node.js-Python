//src/pages/suppliers/Suppliers.jsx            # Main suppliers page (List & actions)

import React, { useState, useEffect } from 'react';
import suppliersService from '../../services/suppliersService';
import SupplierRow from './SupplierRow';
import SupplierForm from './SupplierForm';

function Suppliers() {
    const [suppliers, setSuppliers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingSupplier, setEditingSupplier] = useState(null);

    const fetchSuppliers = async () => {
        try {
            const response = await suppliersService.getSuppliers();
            setSuppliers(response.data);
        } catch (error) {
            console.error('Error fetching suppliers:', error);
        }
    };

    useEffect(() => {
        fetchSuppliers();
    }, []);

    const handleFormSubmit = async (supplier) => {
        try {
            if (editingSupplier) {
                await suppliersService.updateSupplier(editingSupplier.id, supplier);
            } else {
                await suppliersService.createSupplier(supplier);
            }
            setShowForm(false);
            setEditingSupplier(null);
            fetchSuppliers();
        } catch (error) {
            console.error('Error saving supplier:', error);
        }
    };

    const handleEdit = (supplier) => {
        setEditingSupplier(supplier);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this supplier?')) {
            try {
                await suppliersService.deleteSupplier(id);
                fetchSuppliers();
            } catch (error) {
                console.error('Error deleting supplier:', error);
            }
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Suppliers</h1>
            <button
                onClick={() => setShowForm(true)}
                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Add Supplier
            </button>
            {showForm && (
                <SupplierForm
                    onSubmit={handleFormSubmit}
                    editingSupplier={editingSupplier}
                />
            )}
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-700">Name</th>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-700">Email</th>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-700">Phone</th>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {suppliers.map((supplier) => (
                        <SupplierRow
                            key={supplier.id}
                            supplier={supplier}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Suppliers;
