//src/features/inventory/pages/LowStockAlert.jsx 

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from "../../../components/common/Card";
import Loader from "../../../components/common/Loader";
import Table from "../../../components/common/Button";

import InventoryTable from "../components/InventoryTable";
import { getLowStock } from "../inventory.api";

const LowStockAlert = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState([]);
    const [threshold, setThreshold] = useState(5); // Default threshold

/* Fetch low-stock items */
    useEffect(() => {
        const fetchLowStockItems = async () => {
            setLoading(true);
            try {
                const response = await getLowStock(threshold);
                setItems(response.data);
            } catch (error) {
                console.error("Error fetching low stock items:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLowStockItems();
    }, [threshold]);

/* UI */
    return (
        <Card title="Low Stock Alert">
            {loading && <Loader />}

            {!loading && (
                <>
                    <div className="flex items-center gap-4 mb-4">
                        <label htmlFor="threshold" className="font-medium">
                            Stock Threshold:
                        </label>
                        <input
                            type="number"
                            id="threshold"
                            value={threshold}
                            onChange={(e) => setThreshold(Number(e.target.value))}
                            className="border rounded px-2 py-1 w-20"
                            min="1"
                        />
                        <span className="text-sm text-gray-600">
                            (Items with stock less than or equal to this value will be shown)
                        </span>
                    </div>
                    
                    {/* Empty State */}
                    {items.length === 0 ? (
                        <p className="text-center text-gray-500 mt-4">All items are sufficiently stocked.</p>
                    ) : (
                        <InventoryTable items={items} onRowClick={(itemId) => navigate(`/inventory/items/${itemId}`)} />
                    )}

                    {/* Actions */}
                    <div className="mt-4 flex justify-end">
                        <Button
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            onClick={() => navigate('/inventory/restock')}
                        >
                            Go to Restock Page
                        </Button>
                    </div>  
                </>
            )}
        </Card>
    );
};

export default LowStockAlert;
