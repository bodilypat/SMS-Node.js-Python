//src/features/inventory/pages/StockIn.jsx

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../../components/common/Card';
import StockForm from '../components/StockForm';
import { getProducts } from '../../products/product.api';
import { getSuppliers } from '../../suppliers/supplier.api';
import { createStockIn } from '../inventory.api';
import Loader from '../../../components/common/Loader';

const StockIn = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [suppliers, setSuppliers] = useState([]);

    cosnt [formData, setFormData] = useState({
        productId: '',
        supplierId: '',
        quantity: '',
        expiryDate: ''
    });

    const [errors, setErrors] = useState({});

    /* Fetch products and suppliers on component mount */
    useEffect(() => {
        const fetchProductsAndSuppliers = async () => {
            setLoading(true);
            try {
                const productsResponse = await getProducts();
                setProducts(productsResponse.data);

                const suppliersResponse = await getSuppliers();
                setSuppliers(suppliersResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductsAndSuppliers();
    }, []);

    /* Handle form input changes */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    /* Validate form data */
    const validate = () => {
        const newErrors = {};
        if (!formData.productId) newErrors.productId = 'Product is required';
        if (!formData.supplierId) newErrors.supplierId = 'Supplier is required';
        if (!formData.quantity || isNaN(formData.quantity) || formData.quantity <= 0) {
            newErrors.quantity = 'Quantity must be a positive number';
        }
        return newErrors;
    };

    /* Handle Stock In submission */
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setLoading(true);
        try {
            await createStockIn(formData);
            navigate('/inventory/stock-in/list');
        } catch (error) {
            console.error("Error creating stock in record:", error);
        } finally {
            setLoading(false);
        }
    };

    /* Handle cancel button click */
    const handleCancel = () => {
        navigate('/inventory/stock-in/list');
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <Card title="Stock In">
            <StockForm
                products={products.find((p) => p.id === formData.productId) || {}}
                quantity={formData.quantity}
                onChange={handleChange}
                onSubmit={handleSubmit}
                type="in"
                onCancel={handleCancel}
                errors={errors}
            />
            {/* Select product droptown */}
            <div className="form-group">
                <label htmlFor="productId">Product</label>
                <select
                    id="productId"  
                    name="productId"
                    value={formData.productId}
                    onChange={(e) => handleChange("productId", e.target.value)}
                    className={`form-control ${errors.productId ? 'is-invalid' : ''}`}
                >
                    <option value="">Select a product</option>
                    {products.map((product) => (
                        <option key={product.id} value={product.id}>
                            {product.name}
                        </option>
                    ))}
                </select>
                {errors.productId && <div className="invalid-feedback">{errors.productId}</div>}
            </div>
            
            {/* Supplier dropdown */}
            <div className="form-group">
                <label htmlFor="supplierId">Supplier</label>
                <select
                    id="supplierId"
                    name="supplierId"
                    value={formData.supplierId}
                    onChange={(e) => handleChange("supplierId", e.target.value)}
                    className={`form-control ${errors.supplierId ? 'is-invalid' : ''}`}
                >
                    <option value="">Select a supplier</option>
                    {suppliers.map((supplier) => (
                        <option key={supplier.id} value={supplier.id}>
                            {supplier.name}
                        </option>
                    ))}
                </select>
                {errors.supplierId && <div className="invalid-feedback">{errors.supplierId}</div>}
            </div>

            {/* Expiry date */}
            <div className="form-group">
                <label htmlFor="expiryDate">Expiry Date</label>
                <input
                    type="date"
                    id="expiryDate"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={(e) => handleChange("expiryDate", e.target.value)}
                    className={`form-control ${errors.expiryDate ? 'is-invalid' : ''}`}
                />
                {errors.expiryDate && <div className="invalid-feedback">{errors.expiryDate}</div>}
            </div>

            {/* Quantity input */}
            <div className="form-group">
                <label htmlFor="quantity">Quantity</label>
                <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={(e) => handleChange("quantity", e.target.value)}
                    className={`form-control ${errors.quantity ? 'is-invalid' : ''}`}
                />
                {errors.quantity && <div className="invalid-feedback">{errors.quantity}</div>}
            </div>

            {/* Buttons */}
            <div className="form-group mt-3">
                <button type="submit" className="btn btn-primary mr-2" onClick={handleSubmit}>
                    Submit
                </button>
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                    Cancel
                </button>
            </div>  
        </Card>
    );
};
export default StockIn;


