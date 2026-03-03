//src/pages/customers/CustomerRow.jsx    # Single row in customer table

import React from 'react';

function CustomerRow({ customer, onEdit, onDelete }) {
    return (
        <tr className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.customer_name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.customer_email}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.customer_phone}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <button
                    onClick={() => onEdit(customer)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                >
                    Edit
                </button>
                <button
                    onClick={() => onDelete(customer.id)}
                    className="text-red-600 hover:text-red-900"
                >
                    Delete
                </button>
            </td>
        </tr>
    );
}

export default CustomerRow;
