//src/pages/Products.jsx 

import { useState, useEffect } from 'react';
import API from '../api/axios';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');


const Products = () => {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({
        productName: '',
        sku: '',
        unitPrice: '',
        stockQuantity: '',
        categoryId: ''
    });
    const [image, setImage] = useState(null);

    const fetchProducts = async () => {
        const { data } = await API.get('/products');
        setProducts(data);
    };

    useEffect(() => {
        fetchProducts();

        socket.on('stockUpdate', (update) => {
            setProducts(prevProducts => prevProducts.map(p => 
                p._id === update.productId ? { ...p, stockQuantity: update.newStock } : p
            ));
        });

        return () => {
            socket.off('stockUpdate');
        };  
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(form).forEach(key => formData.append(key, form[key]));
        if (image) {
            formData.append('image', image);
        }
        await API.post('/products', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        fetchProducts();
    };

    return (
        <div>
            <h1>Products Management</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Product Name" value={form.productName} onChange={e => setForm({ ...form, productName: e.target.value })} required />
                <input type="text" placeholder="SKU" value={form.sku} onChange={e => setForm({ ...form, sku: e.target.value })} required />
                <input type="number" placeholder="Unit Price" value={form.unitPrice} onChange={e => setForm({ ...form, unitPrice: e.target.value })} required />
                <input type="number" placeholder="Stock Quantity" value={form.stockQuantity} onChange={e => setForm({ ...form, stockQuantity: e.target.value })} required />

                <select value={form.categoryId} onChange={e => setForm({ ...form, categoryId: e.target.value })} required>
                    <option value="">Select Category</option>
                    {/* Categories should be fetched and mapped here */}
                </select>

                <input type="file" onChange={e => setImage(e.target.files[0])} />
                <button type="submit">Add Product</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>SKU</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product._id}>
                            <td>{product.productName}</td>
                            <td>{product.sku}</td>
                            <td>{product.unitPrice}</td>    
                            <td>{product.stockQuantity}</td>
                            <td>{product.categoryId}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Products;

    