//src/context/InventoryContext.jsx 

import React, { createContext, useState, useEffect } from 'react';
import inventoryService from '../services/inventoryService';

// Create the context 
export const InventoryContext = createContext();

// Create the provider component
export const InventoryProvider = ({ children }) => {
    // State to hold inventory items
    const [inventory, setInventory] = useState([]);
    const [lowStockItems, setLowStockItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch inventory from API
    const fetchInventory = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await inventoryService.getInventory();
            setInventory(response.data);
            updateLowStock(response.data);
        } catch (err) {
            setError(err.message || 'Failed to fetch inventory');
        } finally {
            setLoading(false);
        }
    };

    // Add new stock 
    const addStock = async (stockItem) => {
        try {
              const response = await inventoryService.addStock(stockItem);
            setInventory(prev => [...prev, response.data]);
            updateLowStock([...inventory, response.data]);
        } catch (err) {
            setError(err.message || 'Failed to add stock');
        }
    };

    // Remove stock 
    const removeStock = async (itemId, quantity) => {
        setLoading(true);
        setError(null);
        try {
            const response = await inventoryService.removeStock(itemId, quantity);
            const updatedInventory = inventory.map(item =>
                item.id === itemId ? { ...item, quantity: response.data.quantity } : item
            );
            setInventory(updatedInventory);
            updateLowStock(updatedInventory);
        } catch (err) {
            setError(err.message || 'Failed to remove stock');
        } finally {
            setLoading(false);
        }
    };

    // Update stock item 
    const updateStockItem = async (itemId, updatedData) => {
        const updatedInventory = inventory.map(item =>
            item.id === itemId ? { ...item, ...updatedData } : item
        );
        setInventory(updatedInventory);
        updateLowStock(updatedInventory);
    };

    // Helper : update Low stock items
    const updateLowStock = (inventory) => {
        const lowStock = inventory.filter(item => item.quantity < 5); // Example threshold
        setLowStockItems(lowStock);
    }
    // Fetch inventory on component mount
    useEffect(() => {
        fetchInventory();
    }, []);

    return (
        <InventoryContext.Provider value={{ inventory, lowStockItems, loading, error, addStock, removeStock, updateStockItem }}>
            {children}
        </InventoryContext.Provider>
    );
};

