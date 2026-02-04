//src/features/inventory/components/InventoryTable.jsx

import React from 'react';

import Card from "../../../components/common/Card";
import Table from "../../../components/common/Table";

const InventoryTable = ({ 
    items = [],
    showSupplier = false,
    showSupplier = false,
    showExpiry = false,
    onEditItem = () => {},
    onDeleteItem = () => {}
}) => {
    if (!items.length) {
        return (
            <p className="text-center">No inventory items available.</p>
        );
    }

    return (
        <Table>
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    {showSupplier && <th>Supplier</th>}
                    {showExpiry && <th>Expiry Date</th>}
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {items.map(item => (
                    <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        {showSupplier && <td>{item.supplier}</td>}
                        {showExpiry && <td>{item.expiryDate}</td>}
                        <td>
                            <button onClick={() => onEditItem(item)}>Edit</button>
                            <button onClick={() => onDeleteItem(item.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};
InventoryTable.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        supplier: PropTypes.string,
        expiryDate: PropTypes.string,
    })).isRequired,
    showSupplier: PropTypes.bool,
    showExpiry: PropTypes.bool,
    onEditItem: PropTypes.func.isRequired,
    onDeleteItem: PropTypes.func.isRequired
};
export default InventoryTable;
