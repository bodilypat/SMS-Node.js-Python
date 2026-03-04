//src/pages/Sales.jsx 

import { useState, useEffect } from 'react';
import API from '../api/axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


const Sales = () => {
    const [sales, setSales] = useState([]);
    const [cart, setCart] = useState([]);
    const [tax, setTax] = useState();

    useEffect(() => {
        API.get('/products').then(res => setProducts(res.data)).catch(err => console.error(err));
        API.get('/sales').then(res => setSales(res.data)).catch(err => console.error(err));
    }, []);

    const addToCart = (product) => {
        const existingItem = cart.find(item => item.productId === product._id);
        if (existingItem) {
            setCart(cart.map(item => 
                item.productId === product._id ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            setCart([...cart, { productId: product._id, name: product.name, price: product.price, quantity: 1 }]);
        }
    };

    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const taxAmount = tax ? subtotal * (parseFloat(tax) / 100) : 0;
    const grandTotal = subtotal + taxAmount;

    const handleCheckout = async () => {
        try {
            await API.post('/sales', { items: cart, tax, totalAmount: subtotal, grandTotal });
            setCart([]);
            setTax('');
            API.get('/sales').then(res => setSales(res.data)).catch(err => console.error(err));
        } catch (err) {
            console.error(err);
        }
    };
    const generatePDF = (sale) => {
        const doc = new jsPDF();
        doc.text(`Sale ID: ${sale._id}`, 10, 10);
        doc.text(`Date: ${new Date(sale.createdAt).toLocaleString()}`, 10, 20);
        doc.text(`Customer: ${sale.customer_id ? sale.customer_id.name : 'N/A'}`, 10, 30);
        const tableData = sale.items.map(item => [
            item.productId ? item.productId.name : 'N/A',
            item.quantity,
            `$${item.unitPrice.toFixed(2)}`,
            `$${item.totalPrice.toFixed(2)}`
        ]);
        doc.autoTable({
            head: [['Product', 'Quantity', 'Unit Price', 'Total Price']],
            body: tableData,
            startY: 40
        }); 
        doc.text(`Subtotal: $${sale.totalAmount.toFixed(2)}`, 10, doc.lastAutoTable.finalY + 10);
        doc.text(`Tax: ${sale.tax}`, 10, doc.lastAutoTable.finalY + 20);
        doc.text(`Grand Total: $${sale.grandTotal.toFixed(2)}`, 10, doc.lastAutoTable.finalY + 30);
        doc.save(`sale_${sale._id}.pdf`);
    };

    return (
        <div>
            <h1>Sales</h1>
            <div>
                <h2>Products</h2>
                {products.map(product => (
                    <div key={product._id}>
                        <span>{product.name} - ${product.price} (Stock: {product.stockQuantity})</span>
                        <button onClick={() => addToCart(product)} disabled={product.stockQuantity === 0}>Add to Cart</button>
                    </div>
                ))}
            </div>
            <div>
                <h2>Cart</h2>
                {cart.map(item => (
                    <div key={item.productId}>
                        <span>{item.name} - ${item.price} x {item.quantity}</span>
                    </div>
                ))}
                <div>
                    <label>Tax (%): </label>
                    <input type="number" value={tax} onChange={(e) => setTax(e.target.value)} />
                </div>
                <div>Subtotal: ${subtotal.toFixed(2)}</div>
                <div>Tax: ${taxAmount.toFixed(2)}</div>
                <div>Grand Total: ${grandTotal.toFixed(2)}</div>
                <button onClick={handleCheckout} disabled={cart.length === 0}>Checkout</button>
            </div>
            <div>
                <h2>Sales History</h2>
                {sales.map(sale => (    
                    <div key={sale._id}>
                        <span>Sale ID: {sale._id} - Total: ${sale.grandTotal.toFixed(2)} - Date: {new Date(sale.createdAt).toLocaleString()}</span>
                    </div>  
                ))}
            </div>
        </div>
    );
};

export default Sales;
