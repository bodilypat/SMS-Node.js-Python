//src/validations/product.validation.js 

import Joi from 'joi';

export const createProductSchema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    sku: Joi.string().alphanum().min(3).max(30).required(),
    barcode: Joi.string().alphanum().min(8).max(20).required(),

    category: Joi.string().min(3).max(50).required(),

    costPrice: Joi.number().positive().required(),
    sellingPrice: Joi.number().positive().required(),

    quantity: Joi.number().integer().min(0).required(),
    minStockLevel: Joi.number().integer().min(0).required(),

    description: Joi.string().max(500).optional(),
    expiryDate: Joi.date().greater('now').optional(),

    supplier: Joi.string().min(3).max(100).optional(),
});

export const updateProductSchema = Joi.object({
    name: Joi.string().min(3).max(100).optional(),
    sku: Joi.string().alphanum().min(3).max(30).optional(),
    barcode: Joi.string().alphanum().min(8).max(20).optional(),
    
    category: Joi.string().min(3).max(50).optional(),

    costPrice: Joi.number().positive().optional(),
    sellingPrice: Joi.number().positive().optional(),

    quantity: Joi.number().integer().min(0).optional(),
    minStockLevel: Joi.number().integer().min(0).optional(),

    description: Joi.string().max(500).optional(),
    expiryDate: Joi.date().greater('now').optional(),
    supplier: Joi.string().min(3).max(100).optional(),
}).min(1); 

export const getProductsSchema = Joi.object({
    category: Joi.string().min(3).max(50).optional(),
    minPrice: Joi.number().positive().optional(),
    maxPrice: Joi.number().positive().optional(),
    inStock: Joi.boolean().optional()
});

export const getProductByIdSchema = Joi.object({
    productId: Joi.string().hex().length(24).required()
});

export const deleteProductSchema = Joi.object({
    productId: Joi.string().hex().length(24).required()
});

export const adjustStockSchema = Joi.object({
    productId: Joi.string().hex().length(24).required(),
    adjustment: Joi.number().integer().required()
});

export const checkLowStockSchema = Joi.object({
    threshold: Joi.number().integer().min(0).required()
});

export const searchProductsSchema = Joi.object({
    query: Joi.string().min(1).max(100).required()
});

export const bulkUpdatePricesSchema = Joi.object({
    productIds: Joi.array().items(Joi.string().hex().length(24)).min(1).required(),
    priceChange: Joi.number().required()
});

export const importProductsSchema = Joi.object({
    file: Joi.any().required()
});

export const exportProductsSchema = Joi.object({
    format: Joi.string().valid('csv', 'xlsx', 'json').required()
});

export const validateExpiryDatesSchema = Joi.object({
    daysAhead: Joi.number().integer().min(1).required()
});

export const applyDiscountSchema = Joi.object({
    productIds: Joi.array().items(Joi.string().hex().length(24)).min(1).required(),
    discountPercentage: Joi.number().min(0).max(100).required()
});

export const getProductStatisticsSchema = Joi.object({
    startDate: Joi.date().optional(),
    endDate: Joi.date().optional()
});

export const rateProductSchema = Joi.object({
    productId: Joi.string().hex().length(24).required(),
    rating: Joi.number().integer().min(1).max(5).required(),
    review: Joi.string().max(500).optional()
});

export const favoriteProductSchema = Joi.object({
    productId: Joi.string().hex().length(24).required()
});

export const getFavoriteProductsSchema = Joi.object({});

