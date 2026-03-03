//src/pages/products/ProductForm.jsx     # Form for add/edit product

import React from 'react';
import API from '../../services/api';

function ProductForm({ product, onClose, onSubmit }) {
    const [categories, setCategories] = React.useState([]);
    const [formData, setFormData] = React.useState({
        product_name: '',
        category_id: '',
        purchase_price: '',
        selling_price: '',
        stock_quantity: '',
        barcode: '',
        description: '',
    });

    /* Load categories and pre-fill form if editing */
    useEffect(() => {
        // Fetch categories from backend
        API.get('/categories')
            .then(response => setCategories(response.data))
            .catch(error => console.error('Error fetching categories:', error));

            /* If editing, populate form with existing product data */
        if (product) {
            setFormData({
                product_name: product.product_name || '',
                category_id: product.category_id || '',
                purchase_price: product.purchase_price || '',
                selling_price: product.selling_price || '',
                stock_quantity: product.stock_quantity || '',
                barcode: product.barcode || '',
                description: product.description || '',
            });
        }
        }, [product]);
        
        // Handleinput changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    // Submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData); // Parent handles API request 
    };

    return (
        <div className="product-form-overlay">
            <h2 className="product-form-title">{product ? 'Edit Product' : 'Add Product'}</h2>
            <form className="product-form" onSubmit={handleSubmit}>
                <label>Product Name:</label>
                <input
                    type="text"
                    name="product_name"
                    value={formData.product_name}
                    placeholder="Enter product name"
                    onChange={handleChange}
                    required
                />
                <label>Category:</label>
                <select
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select category</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.category_name}
                        </option>
                    ))}
                </select>
                <label>Purchase Price:</label>
                <input
                    type="number"
                    name="purchase_price"
                    value={formData.purchase_price}
                    placeholder="Enter purchase price"
                    onChange={handleChange}
                    required
                />
                <label>Selling Price:</label>
                <input
                    type="number"
                    name="selling_price"
                    value={formData.selling_price}
                    placeholder="Enter selling price"
                    onChange={handleChange}
                    required
                />
                <label>Stock Quantity:</label>
                <input
                    type="number"
                    name="stock_quantity"
                    value={formData.stock_quantity}
                    placeholder="Enter stock quantity"
                    onChange={handleChange}
                    required
                />
                <label>Barcode:</label>
                <input
                    type="text"
                    name="barcode"
                    value={formData.barcode}
                    placeholder="Enter barcode"
                    onChange={handleChange}
                />
                <label>Description:</label>
                <textarea
                    name="description"
                    value={formData.description}
                    placeholder="Enter product description"
                    onChange={handleChange}
                />
                <div className="form-buttons">
                    <button type="submit" className="submit-btn">
                        {product ? 'Update' : 'Add'}
                    </button>
                    <button type="button" className="cancel-btn" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
};

export default ProductForm;

