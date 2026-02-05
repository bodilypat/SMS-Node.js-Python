//src/controllers/category_controller.js 

import * as categoryService from '../services/category_service.js';
import { success } from '../utils/response.js';

export const getAllCategories = async (req, res, next) => {
    try {
        const categories = await categoryService.fetchAllCategories();
        res.json(success(categories));
    } catch (error) {
        next(error);
    }
};

export const getCategoryById = async (req, res, next) => {
    try {
        const categoryId = req.params.id;
        const category = await categoryService.fetchCategoryById(categoryId);
        res.json(success(category));
    } catch (error) {
        next(error);
    }
};

export const createCategory = async (req, res, next) => {
    try {
        const categoryData = req.body;
        const newCategory = await categoryService.addCategory(categoryData);
        res.status(201).json(success(newCategory));
    } catch (error) {
        next(error);
    }
};

export const updateCategory = async (req, res, next) => {
    try {
        const categoryId = req.params.id;
        const categoryData = req.body;
        const updatedCategory = await categoryService.modifyCategory(categoryId, categoryData);
        res.json(success(updatedCategory));
    } catch (error) {
        next(error);
    }
};

export const deleteCategory = async (req, res, next) => {
    try {
        const categoryId = req.params.id;
        await categoryService.removeCategory(categoryId);
        res.status(204).end();
    } catch (error) {
        next(error);
    }
};

export const getCategoriesWithProducts = async (req, res, next) => {
    try {
        const categoriesWithProducts = await categoryService.fetchCategoriesWithProducts();
        res.json(success(categoriesWithProducts));
    } catch (error) {
        next(error);
    }
};

export const getCategoryStatistics = async (req, res, next) => {
    try {
        const statistics = await categoryService.fetchCategoryStatistics();
        res.json(success(statistics));
    } catch (error) {
        next(error);
    }
};

export const getCategoriesByPopularity = async (req, res, next) => {
    try {
        const popularCategories = await categoryService.fetchCategoriesByPopularity();
        res.json(success(popularCategories));
    } catch (error) {
        next(error);
    }
};

export const searchCategories = async (req, res, next) => {
    try {
        const query = req.query.q;
        const results = await categoryService.searchCategories(query);
        res.json(success(results));
    } catch (error) {
        next(error);
    }
};

export const bulkCreateCategories = async (req, res, next) => {
    try {
        const categoriesData = req.body;
        const newCategories = await categoryService.addMultipleCategories(categoriesData);
        res.status(201).json(success(newCategories));
    } catch (error) {
        next(error);
    }
};

export const bulkDeleteCategories = async (req, res, next) => {
    try {
        const categoryIds = req.body.ids;
        await categoryService.removeMultipleCategories(categoryIds);
        res.status(204).end();
    } catch (error) {
        next(error);
    }
};



