//src/controllers/order_controller.js 

import * as orderService from '../services/order_service.js';
import { success } from '../utils/response.js';

export const createOrder = async (req, res, next) => {
    try {
        const orderData = req.body;
        const newOrder = await orderService.createOrder(orderData);
        return success(res, newOrder, 'Order created successfully', 201);
    } catch (error) {
        next(error);
    }
};

export const getOrderById = async (req, res, next) => {
    try {
        const orderId = req.params.id;
        const order = await orderService.getOrderById(orderId);
        return success(res, order, 'Order retrieved successfully');
    } catch (error) {
        next(error);
    }
};

export const updateOrder = async (req, res, next) => {
    try {
        const orderId = req.params.id;
        const updateData = req.body;
        const updatedOrder = await orderService.updateOrder(orderId, updateData);
        return success(res, updatedOrder, 'Order updated successfully');
    } catch (error) {
        next(error);
    }
};

export const deleteOrder = async (req, res, next) => {
    try {
        const orderId = req.params.id;
        await orderService.deleteOrder(orderId);
        return success(res, null, 'Order deleted successfully', 204);
    } catch (error) {
        next(error);
    }
};

export const listOrders = async (req, res, next) => {
    try {
        const filters = req.query;
        const orders = await orderService.listOrders(filters);
        return success(res, orders, 'Orders retrieved successfully');
    } catch (error) {
        next(error);
    }
};

export const changeOrderStatus = async (req, res, next) => {
    try {
        const orderId = req.params.id;
        const { status } = req.body;
        const updatedOrder = await orderService.changeOrderStatus(orderId, status);
        return success(res, updatedOrder, 'Order status updated successfully');
    } catch (error) {
        next(error);
    }
};

export const assignOrderToUser = async (req, res, next) => {
    try {
        const orderId = req.params.id;
        const { userId } = req.body;
        const updatedOrder = await orderService.assignOrderToUser(orderId, userId);
        return success(res, updatedOrder, 'Order assigned to user successfully');
    } catch (error) {
        next(error);
    }
};

export const getOrdersByUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const orders = await orderService.getOrdersByUser(userId);
        return success(res, orders, 'Orders for user retrieved successfully');
    } catch (error) {
        next(error);
    }
};

export const getOrdersByStatus = async (req, res, next) => {
    try {
        const status = req.params.status;
        const orders = await orderService.getOrdersByStatus(status);
        return success(res, orders, 'Orders with status retrieved successfully');
    } catch (error) {
        next(error);
    }
};

export const getOrderStatistics = async (req, res, next) => {
    try {
        const stats = await orderService.getOrderStatistics();
        return success(res, stats, 'Order statistics retrieved successfully');
    } catch (error) {
        next(error);
    }
};

export const bulkUpdateOrders = async (req, res, next) => {
    try {
        const updates = req.body;
        const result = await orderService.bulkUpdateOrders(updates);
        return success(res, result, 'Bulk order update successful');
    } catch (error) {
        next(error);
    }
};

export const exportOrders = async (req, res, next) => {
    try {
        const filters = req.query;
        const exportData = await orderService.exportOrders(filters);
        return success(res, exportData, 'Orders exported successfully');
    } catch (error) {
        next(error);
    }
};

export const importOrders = async (req, res, next) => {
    try {
        const importData = req.body;
        const result = await orderService.importOrders(importData);
        return success(res, result, 'Orders imported successfully');
    } catch (error) {
        next(error);
    }
};

export const getRecentOrders = async (req, res, next) => {
    try {
        const recentOrders = await orderService.getRecentOrders();
        return success(res, recentOrders, 'Recent orders retrieved successfully');
    } catch (error) {
        next(error);
    }
};

export const archiveOrder = async (req, res, next) => {
    try {
        const orderId = req.params.id;
        const archivedOrder = await orderService.archiveOrder(orderId);
        return success(res, archivedOrder, 'Order archived successfully');
    } catch (error) {
        next(error);
    }
};

export const restoreOrder = async (req, res, next) => {
    try {
        const orderId = req.params.id;
        const restoredOrder = await orderService.restoreOrder(orderId);
        return success(res, restoredOrder, 'Order restored successfully');
    } catch (error) {
        next(error);
    }
};

