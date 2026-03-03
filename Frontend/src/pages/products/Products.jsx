//src/pages/products/Products.jsx     # Main products page 

import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import ProductRow from './ProductRow';
import ProductForm from './ProductForm';
import './products.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [showForm, setShowForm] = useState(false);

    /* Fetch products from API */
    const fetchProducts = async () => {
        try {
            const response = await API.get('/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleEdit = (product) => {
        setEditingProduct(product);
        setShowForm(true);
    };

    const handleFormClose = () => {
        setEditingProduct(null);
        setShowForm(false);
        fetchProducts(); // Refresh product list after form is closed
    };

    const handleFormSubmit = async (productData) => {
        try {
            if (editingProduct) {
                // Update existing product
                await API.put(`/products/${editingProduct.id}`, productData);
            } else {
                // Create new product
                await API.post('/products', productData);
            }
            fetchProducts(); // Refresh product list after submission
            handleFormClose();
        } catch (error) {
            console.error('Error submitting product:', error);
        }
    };

    const handleDelete = async (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await API.delete(`/products/${productId}`);
                fetchProducts(); // Refresh product list after deletion
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };

    return (
        <div className="products-page">
            <h1>Products</h1>

            <button className="add-product-btn" onClick={() => setShowForm(true)}>
                Add Product
            </button>

            {showForm && (
                <ProductForm
                    product={editingProduct}
                    onSubmit={handleFormSubmit}
                    onClose={handleFormClose}
                />
            )}
            <div className="products-table-container">
                <table className="products-table">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border-b">Name</th>
                            <th className="px-4 py-2 border-b">Category</th>
                            <th className="px-4 py-2 border-b">Purchase Price</th>
                            <th className="px-4 py-2 border-b">Selling Price</th>
                            <th className="px-4 py-2 border-b">Stock</th>
                            <th className="px-4 py-2 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <ProductRow
                                key={product.id}
                                product={product}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Products;

