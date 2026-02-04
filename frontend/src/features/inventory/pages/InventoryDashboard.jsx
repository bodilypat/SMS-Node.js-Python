//src/features/inventory/pages/InventoryDashboard.jsx 

import { useEffect, useState } from 'react';
import { getInventory, getLowStock } from "../inventory.api";
import InventoryTable from "../components/InventoryTable";

/* Features Implemented
** Stock In / Stock Out 
** Low-stock alerts 
** Supplier-wise invetory 
** Expiry tracking (optional)
 */

const InventoryDashboard = () => {
    const [inventory, setInventory] = useState([]); 
    const [lowStockItems, setLowStockItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const inventoryData = await getInventory();
            const lowStockData = await getLowStock();
            setInventory(inventoryData);
            setLowStockItems(lowStockData);
            setLoading(false);
        };
        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Inventory Dashboard</h1>
            <h2>All Inventory Items</h2>
            <InventoryTable items={inventory} />
            <h2>Low Stock Items</h2>
            <InventoryTable items={lowStockItems} />
        </div>
    );
};

export default InventoryDashboard;

