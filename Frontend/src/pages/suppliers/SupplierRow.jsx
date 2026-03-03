//src/pages/suppliers/SupplierRow.jsx       # Single row in suppliers table

import React from 'react';

function SupplierRow({ supplier, onEdit, onDelete }) {
    return (
        <tr className="border-b hover:bg-gray-50">
            <td className="px-4 py-2">{supplier.name}</td>
            <td className="px-4 py-2">{supplier.contact}</td>
            <td className="px-4 py-2">{supplier.email}</td>
            <td className="px-4 py-2">
                <button 
                    className="text-blue-500 hover:underline mr-2"
                    onClick={() => onEdit(supplier)}
                >
                    Edit
                </button>
                <button 
                    className="text-red-500 hover:underline"
                    onClick={() => onDelete(supplier.id)}
                >
                    Delete
                </button>
            </td>
        </tr>
    );
}

export default SupplierRow;
