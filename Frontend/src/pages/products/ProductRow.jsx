//src/pages/products/ProductRow.jsx       # Single row in products table

import React from 'react';

function ProductRow({ product, onEdit, onDelete }) {
    return (
        <tr className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.category_name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${product.purchase_price.toFixed(2)}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${product.selling_price.toFixed(2)}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.stock_quantity}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.barcode || "-"}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <button
                    onClick={() => onEdit(product)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                >
                    Edit
                </button>
                <button
                    onClick={() => onDelete(product.id)}
                    className="text-red-600 hover:text-red-900"
                >
                    Delete
                </button>
            </td>
        </tr>
    );
}
export default ProductRow;

