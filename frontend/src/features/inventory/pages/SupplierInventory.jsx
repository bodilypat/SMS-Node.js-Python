//src/features/inventory/pages/SupplierInventory.jsx

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from "../../../components/common/Card";
import Loader from "../../../components/common/Loader";
import Button from '../../../components/common/Button';

import InventoryTable from '../components/InventoryTable';
import { getSupplierInventory } from '../inventory.api';
import { getSuppliers } from '../../suppliers/supplier.api';

const supplierInventory = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [suppliers, setSuppliers] = useState([]);
    const [selectedSupplier, setSeletedSupplier] = useState("");
    const [inventory, setInventory] = useState([]);

    /* Fetch suppliers on mount */
    useEffect(() => {
        const fetchSuppliers = async () => {
            setLoading(true);
            try {
                const response = await getSuppliers();
                setSuppliers(response.data);
            } catch (error) {
                console.error("Error fetching suppliers:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSuppliers();
    }, []);

    /* Fetch inventory for selected supplier */
    useEffect(() => {
        if (selectedSupplier) {
            const fetchInventory = async () => {
                setLoading(true);
                try {
                    const response = await getSupplierInventory(selectedSupplier);
                    setInventory(response.data);
                } catch (error) {
                    console.error("Error fetching supplier inventory:", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchInventory();
        }
    }, [selectedSupplier]);

    /* UI */
    return (
        <Card title="Supplier Inventory">
            {loading && <Loader />}

            {!loading && (
                <>
                    {/* Supplier Selector */}
                    <div className="mb-4">
                        <label className="block mb-2 font-medium">Select Supplier:</label>
                        <select
                            className="border border-gray-300 rounded px-3 py-2 w-full"
                            value={selectedSupplier}
                            onChange={(e) => setSeletedSupplier(e.target.value)}

                        >
                            <option value="">-- Select Supplier --</option>
                            {suppliers.map((supplier) => (
                                <option key={supplier.id} value={supplier.id}>
                                    {supplier.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* Inventory Table */}
                    {selectedSupplier ? (
                        inventory.length > 0 ? (
                            <InventoryTable 
                                inventory={inventory}
                                onEditItem={(itemId) => navigate(`/inventory/edit/${itemId}`)}
                            />
                        ) : (
                            <p>No inventory items found for this supplier.</p>
                        )
                    ) : (
                        <p>Please select a supplier to view inventory.</p>
                    )}

                    {/* Actions */}
                    <div className="mt-4 flex justify-end">
                        <Button
                            variant="primary"
                            onClick={() => navigate('/inventory/stock-in')}
                        >
                            Stock In
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => navigate('/inventory/suppliers')}
                        >
                            View Suppliers
                        </Button>
                    </div>
                </>
            )}
        </Card>
    );
};

export default supplierInventory;
                        
