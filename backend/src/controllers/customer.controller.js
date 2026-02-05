//src/controllers/customer_controller.js 

import * as customerService from '../services/customer_service.js';
import { success } from '../utils/response.js";

export const getAllCustomers = async (req, res, next) => {
    try {
        const customers = await customerService.getAllCustomers();
        res.json(success(customers));
    }catch (error) {
        next(error);
    }
};

export const getCustomerById = async (req, res, next) => {
    try {
        const customerId = req.params.id;
        const customer = await customerService.getCustomerById(customerId);
        res.json(success(customer));
    } catch (error) {
        next(error);
    }
};

export const createCustomer = async (req, res, next) => {
    try {
        const customerData = req.body;
        const newCustomer = await customerService.createCustomer(customerData);
        res.status(201).json(success(newCustomer));
    } catch (error) {
        next(error);
    }
};

export const updateCustomer = async (req, res, next) => {
    try {
        const customerId = req.params.id;
        const customerData = req.body;
        const updatedCustomer = await customerService.updateCustomer(customerId, customerData);
        res.json(success(updatedCustomer));
    } catch (error) {
        next(error);
    }
};

export const deleteCustomer = async (req, res, next) => {
    try {
        const customerId = req.params.id;
        await customerService.deleteCustomer(customerId);
        res.status(204).end();
    } catch (error) {
        next(error);
    }
};

export const searchCustomers = async (req, res, next) => {
    try {
        const query = req.query.q;
        const customers = await customerService.searchCustomers(query);
        res.json(success(customers));
    } catch (error) {
        next(error);
    }
};

export const getCustomerOrders = async (req, res, next) => {
    try {
        const customerId = req.params.id;
        const orders = await customerService.getCustomerOrders(customerId);
        res.json(success(orders));
    } catch (error) {
        next(error);
    }
};

export const addCustomerOrder = async (req, res, next) => {
    try {
        const customerId = req.params.id;
        const orderData = req.body;
        const newOrder = await customerService.addCustomerOrder(customerId, orderData);
        res.status(201).json(success(newOrder));
    } catch (error) {
        next(error);
    }
};

export const getCustomerAddresses = async (req, res, next) => {
    try {
        const customerId = req.params.id;
        const addresses = await customerService.getCustomerAddresses(customerId);
        res.json(success(addresses));
    } catch (error) {
        next(error);
    }
};

export const addCustomerAddress = async (req, res, next) => {
    try {
        const customerId = req.params.id;
        const addressData = req.body;
        const newAddress = await customerService.addCustomerAddress(customerId, addressData);
        res.status(201).json(success(newAddress));
    } catch (error) {
        next(error);
    }
};

export const getCustomerPayments = async (req, res, next) => {
    try {
        const customerId = req.params.id;
        const payments = await customerService.getCustomerPayments(customerId);
        res.json(success(payments));
    } catch (error) {
        next(error);
    }
};

export const addCustomerPayment = async (req, res, next) => {
    try {
        const customerId = req.params.id;
        const paymentData = req.body;
        const newPayment = await customerService.addCustomerPayment(customerId, paymentData);
        res.status(201).json(success(newPayment));
    } catch (error) {
        next(error);
    }
};

export const getCustomerSupportTickets = async (req, res, next) => {
    try {
        const customerId = req.params.id;
        const tickets = await customerService.getCustomerSupportTickets(customerId);
        res.json(success(tickets));
    } catch (error) {
        next(error);
    }
};

export const addCustomerSupportTicket = async (req, res, next) => {
    try {
        const customerId = req.params.id;
        const ticketData = req.body;
        const newTicket = await customerService.addCustomerSupportTicket(customerId, ticketData);
        res.status(201).json(success(newTicket));
    } catch (error) {
        next(error);
    }
};

export const getCustomerWishlist = async (req, res, next) => {
    try {
        const customerId = req.params.id;
        const wishlist = await customerService.getCustomerWishlist(customerId);
        res.json(success(wishlist));
    } catch (error) {
        next(error);
    }
};

