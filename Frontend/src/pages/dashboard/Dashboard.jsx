//src/pages/dashboard/Dashboard.jsx 

import { useState, useEffect } from "react";
import  API from "../../services/api";
import StateCard from "./StateCard";
import SalesChart from "./SalesChart";
import ProductChart from "./ProductChart";
import TopProducts from "./TopProducts";
import "./Dashboard.css";

function Dashboard() {
    const [stats, setStats] = useState({ products: 0, sales: 0, customers: 0, suppliers: 0 });
    const [salesData, setSalesData] = useState([]);
    const [productData, setProductData] = useState([]);
    const [topProducts, setTopProducts] = useState([]);

    useEffect(() => {
        const fetchData =  async () => {
            const statsRes = await API.get("/dashboard/stats");
            setStats(statsRes.data);

            const salesRes = await API.get("/dashboard/sales");
            setSalesData(salesRes.data);

            const productRes = await API.get("/dashboard/products");
            setProductData(productRes.data);

            const topRes = await API.get("/dashboard/top-products");
            setTopProducts(topRes.data);
        };
        fetchData();
    }, []);

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <div className="stats-cards">
                <StateCard title="Products" value={stats.products} icon="📦" />
                <StateCard title="Sales" value={stats.sales} icon="💰" />
                <StateCard title="Customers" value={stats.customers} icon="👥" />
                <StateCard title="Suppliers" value={stats.suppliers} icon="🏢" />
            </div>
            <div className="charts">
                <SalesChart data={salesData} />
                <ProductChart data={productData} />
            </div>
            <TopProducts products={topProducts} />
        </div>
    );
}

export default Dashboard;

