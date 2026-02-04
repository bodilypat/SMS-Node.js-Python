//src/features/inventory/pages/StockOut.jsx

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from "../../../components/common/Card";
import Loader from "../../../components/common/Loader";
import Button from "../../../components/common/Button";

import StockForm from "../components/StockForm";
import { getProducts } from "../../products/product.api";
import { stockOut } from "../inventory.api";

const StockOut = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);

    const [form, setForm] = useState({
        productId: '',
        quantity: '',
        date: ''
    });

    const [errors, setErrors] = useState({});

    /* Fetch products on mount */
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await getProducts();
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    /* Handler */
    const handleChange = (name, value) => {
        setForm({
            ...form,
            [name]: value
        });
    };

    const validate = () => {
        const newErrors = {};

        if (!form.productId) newErrors.productId = "Product is required.";
        if (!form.quantity || isNaN(form.quantity) || form.quantity <= 0) {
            newErrors.quantity = "Quantity must be a positive number.";
        }
        
        const selectedProduct = products.find(p => p.id === form.productId);

        if (selectedProduct && form.quantity > selectedProduct.stock) {
            newErrors.quantity = "Quantity exceeds available stock.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) return;

        setLoading(true);
        try {
            await stockOut(form);
            navigate('/inventory');
        } catch (error) {
            console.error("Error submitting stock out:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate('/inventory');
    };

    return (
        <Card title="Stock Out Product">

        {/* Product selector  */}
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Product</label>
                <select
                    value={form.productId}
                    onChange={(e) => handleChange('productId', e.target.value)}
                    className={`w-full p-2 border ${errors.productId ? 'border-red-500' : 'border-gray-300'} rounded`}
                >
                    <option value="">Select a product</option>
                    {products.map(product => (
                        <option key={product.id} value={product.id}>
                            {product.name} (Available: {product.stock})
                        </option>
                    ))}
                </select>
                {errors.productId && <p className="text-red-500 text-sm mt-1">{errors.productId}</p>}
            </div>

            {/* Stock Form */}
            <StockForm
                product={form.productId}
                quantity={form.quantity}
                onChange={handleChange}
                onSubmit={handleSubmit}
                type="out"
                errors={errors}
            />
            {errors.quantity && (
                <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>
            )}

            {/* Actions */}
            <div className="flex justify-end space-x-2 mt-4">
                <Button variant="danger" onClick={handleCancel} disabled={loading}>
                    Stock Out
                </Button>
                <Button variant="secondary" onClick={handleCancel} disabled={loading}>
                    Cancel
                </Button>
            </div>
            {loading && <Loader />}
        </Card>
    );
};

export default StockOut;
