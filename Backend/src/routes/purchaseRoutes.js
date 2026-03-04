//src/routes/purchaseRoutes.js 

const express = require('express');
const router = express.Router();

const {
    createPurchase,
    getPurchases,
    getPurchaseById,
    updatePurchase,
    deletePurchase
} = require('../controllers/PurchaseController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.post(
    '/',
    protect,
    authorize('admin', 'manager'),
    createPurchase
);
router.get(
    '/',
    protect,
    authorize('admin', 'manager', 'cashier'),
    getPurchases
);
router.get(
    '/:id',
    protect,
    authorize('admin', 'manager', 'cashier'),
    getPurchaseById
);
router.put(
    '/:id',
    protect,
    authorize('admin', 'manager'),
    updatePurchase
);
router.delete(
    '/:id',
    protect,
    authorize('admin'),
    deletePurchase
);

module.exports = router;
