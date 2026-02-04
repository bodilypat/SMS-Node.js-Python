//src/features/products/product.api.js 

import api from '../../services/api';

/* Fetch all products */
export const getProducts = async () => {
    const response = await api.get('/products', { params: { limit: 100 }});
    return response.data;
};

/* Fetch product by ID */
export const getProductById = async (productId) => {
    const response = await api.get(`/products/${productId}`);
    return response.data;
};

/* Create a new product, Support file uploads */
export const createProduct = async (productData) => {
    const formData = new FormData();
    for (const key in productData) {
        formData.append(key, productData[key]);
    }
    const response = await api.post('/products', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

/* Update existing product */
export const updateProduct = async (productId, productData) => {
    const response = await api.put(`/products/${productId}`, productData, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

/* Delete a product */
export const deleteProduct = async (productId) => {
    const response = await api.delete(`/products/${productId}`);
    return response.data;
};

/* Search products by query */
export const searchProducts = async (query) => {
    const response = await api.get('/products/search', { params: { q: query }});
    return response.data;
};

/* Fetch products by category */
export const getProductsByCategory = async (category) => {
    const response = await api.get('/products', { params: { category }});
    return response.data;
};

/* Fetch featured products */
export const getFeaturedProducts = async () => {
    const response = await api.get('/products/featured');
    return response.data;
};

/* Fetch new arrials */
export const getNewArrivals = async () => {
    const response = await api.get('/products/new-arrivals');
    return response.data;
};

/* Fetch top rated products */
export const getTopRatedProducts = async () => {
    const response = await api.get('/products/top-rated');
    return response.data;
};

/* Fetch products on sale */
export const getProductsOnSale = async () => {
    const response = await api.get('/products/on-sale');
    return response.data;
};

/* Fetch related products */
export const getRelatedProducts = async (productId) => {
    const response = await api.get(`/products/${productId}/related`);
    return response.data;
};
/* Fetch products by brand */
export const getProductsByBrand = async (brand) => {
    const response = await api.get('/products', { params: { brand }});
    return response.data;
};

/* Fetch products within a price range */
export const getProductsByPriceRange = async (minPrice, maxPrice) => {
    const response = await api.get('/products', { params: { minPrice, maxPrice }});
    return response.data;
};
/* Fetch products with pagination */
export const getProductsPaginated = async (page, limit) => {
    const response = await api.get('/products', { params: { page, limit }});
    return response.data;
};

/* Fetch products sorted by a specific field */
export const getProductsSorted = async (sortBy, order) => {
    const response = await api.get('/products', { params: { sortBy, order }});
    return response.data;
};
