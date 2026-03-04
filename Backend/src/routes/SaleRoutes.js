//src/routes/SaleRoutes.js

const express = require('express');
const router = express.Router();
const SaleController = require('../controllers/SaleController');

const { 
    createSale,
    getAllSales,
    getSaleById,
    updateSale,
    deleteSale
} = SaleController;
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.post(
    '/', protect, 
    authorize('admin', 'manager','cashier'), 
    createSale
);
router.get(
    '/',
    protect,
    authorize('admin'),
    getAllSales
);

router.get(
    '/:id',
    protect,
    authorize('admin', 'cashier'),
    getSaleById
);

router.put(
    '/:id',
    protect,
    authorize('admin', 'manager'),
    updateSale
);

router.delete(
    '/:id',
    protect,
    authorize('admin'),
    deleteSale
);

module.exports = router;

