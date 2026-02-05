//src/context/StoreContext.jsx 

import { createContext, useContext, useState } from 'react';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [inventory, setInventory] = useState([]);
    const [orders, setOrders] = useState([]);

    const addToCart = (product) => {
        setCart((prev) => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map((product) =>
                    product.id === existing.id ? { ...product, quantity: product.quantity + 1 } : product
                );
            } else {
                return [...prev, { ...product, quantity: 1 }];
            }
        });
    };

    return (
        <StoreContext.Provider value={{ cart, inventory, orders, addToCart }}>
            {children}
        </StoreContext.Provider>
    );
};

export const useStore = () => useContext(StoreContext);

