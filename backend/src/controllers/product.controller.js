//src/controllers/product_controller.js 

import * as productService from '../services/product_service.js';
import { success } from '../utils/response.js';

export const getAllProducts = async (req, res, next) => {
    try {
        const products = await productService.fetchAllProducts();
        return success(res, products);
    } catch (error) {
        next(error);
    }
};

export const getProductById = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const product = await productService.fetchProductById(productId);
        return success(res, product);
    } catch (error) {
        next(error);
    }
};

export const createProduct = async (req, res, next) => {
    try {
        const productData = req.body;
        const newProduct = await productService.addNewProduct(productData);
        return success(res, newProduct);
    } catch (error) {
        next(error);
    }
};

export const updateProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const productData = req.body;
        const updatedProduct = await productService.modifyProduct(productId, productData);
        return success(res, updatedProduct);
    } catch (error) {
        next(error);
    }
};

export const deleteProduct = async (req, res, next) => {    
    try {
        const productId = req.params.id;
        await productService.removeProduct(productId);
        return success(res, { message: 'Product deleted successfully' });
    } catch (error) {
        next(error);
    }
};

export const searchProducts = async (req, res, next) => {
    try {
        const query = req.query.q;
        const results = await productService.searchProducts(query);
        return success(res, results);
    } catch (error) {
        next(error);
    }
};

export const filterProductsByCategory = async (req, res, next) => {
    try {
        const category = req.params.category;
        const products = await productService.getProductsByCategory(category);
        return success(res, products);
    } catch (error) {
        next(error);
    }
};

export const sortProductsByPrice = async (req, res, next) => {
    try {
        const order = req.query.order || 'asc';
        const products = await productService.sortProductsByPrice(order);
        return success(res, products);
    } catch (error) {
        next(error);
    }
};

export const paginateProducts = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const products = await productService.getPaginatedProducts(page, limit);
        return success(res, products);
    } catch (error) {
        next(error);
    }
};

export const getFeaturedProducts = async (req, res, next) => {
    try {
        const products = await productService.fetchFeaturedProducts();
        return success(res, products);
    } catch (error) {
        next(error);
    }
};

export const getNewArrivals = async (req, res, next) => {
    try {
        const products = await productService.fetchNewArrivals();
        return success(res, products);
    } catch (error) {
        next(error);
    }
};

export const getProductsOnSale = async (req, res, next) => {
    try {
        const products = await productService.fetchProductsOnSale();
        return success(res, products);
    } catch (error) {
        next(error);
    }
};

export const getRelatedProducts = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const products = await productService.fetchRelatedProducts(productId);
        return success(res, products);
    } catch (error) {
        next(error);
    }
};

export const getProductReviews = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const reviews = await productService.fetchProductReviews(productId);
        return success(res, reviews);
    } catch (error) {
        next(error);
    }
};

export const addProductReview = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const reviewData = req.body;
        const newReview = await productService.addReviewToProduct(productId, reviewData);
        return success(res, newReview);
    } catch (error) {
        next(error);
    }
};

