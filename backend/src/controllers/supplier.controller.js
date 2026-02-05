//src/controllers/supplier_controller.js 

import * as SupplierService from '../services/supplier_service.js';
import { success } from '../utils/response.js';

export const getAllSuppliers = async (req, res, next) => {
    try {
        const suppliers = await SupplierService.getAllSuppliers();
        return success(res, suppliers);
    } catch (error) {
        next(error);
    }
};

export const getSupplierById = async (req, res, next) => {
    try {
        const supplierId = req.params.id;
        const supplier = await SupplierService.getSupplierById(supplierId);
        return success(res, supplier);
    } catch (error) {
        next(error);
    }
};

export const createSupplier = async (req, res, next) => {
    try {
        const supplierData = req.body;
        const newSupplier = await SupplierService.createSupplier(supplierData);
        return success(res, newSupplier);
    } catch (error) {
        next(error);
    }
};

export const updateSupplier = async (req, res, next) => {
    try {
        const supplierId = req.params.id;
        const supplierData = req.body;
        const updatedSupplier = await SupplierService.updateSupplier(supplierId, supplierData);
        return success(res, updatedSupplier);
    } catch (error) {
        next(error);
    }
};

export const deleteSupplier = async (req, res, next) => {
    try {
        const supplierId = req.params.id;
        await SupplierService.deleteSupplier(supplierId);
        return success(res, { message: 'Supplier deleted successfully' });
    } catch (error) {
        next(error);
    }
};

export const searchSuppliers = async (req, res, next) => {
    try {
        const query = req.query.q;
        const suppliers = await SupplierService.searchSuppliers(query);
        return success(res, suppliers);
    } catch (error) {
        next(error);
    }
};

export const getSuppliersByCategory = async (req, res, next) => {
    try {
        const categoryId = req.params.categoryId;
        const suppliers = await SupplierService.getSuppliersByCategory(categoryId);
        return success(res, suppliers);
    } catch (error) {
        next(error);
    }
};

export const getTopRatedSuppliers = async (req, res, next) => {
    try {
        const topSuppliers = await SupplierService.getTopRatedSuppliers();
        return success(res, topSuppliers);
    } catch (error) {
        next(error);
    }
};

export const getSuppliersByLocation = async (req, res, next) => {
    try {
        const location = req.query.location;
        const suppliers = await SupplierService.getSuppliersByLocation(location);
        return success(res, suppliers);
    } catch (error) {
        next(error);
    }
};

