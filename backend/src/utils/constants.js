//src/utils/constants.js 

export const ROLE = {
    ADMIN: 'admin',
    MANAGER: 'manager',
    CASHIER: 'cashier',
    USER: 'user',
};

export const INVENTORY_STATUS = {
    IN_STOCK: 'in_stock',
    OUT_OF_STOCK: 'out_of_stock',
    LOW_STOCK: 'low_stock',
    DISCONTINUED: 'discontinued',
};

export const TRANSACTION_TYPE = {
    SALE: 'sale',
    RETURN: 'return',
    EXCHANGE: 'exchange',
    REFUND: 'refund',
};
export const PAYMENT_METHOD = {
    CASH: 'cash',
    CREDIT_CARD: 'credit_card',
    DEBIT_CARD: 'debit_card',
    MOBILE_PAYMENT: 'mobile_payment',
    ONLINE_PAYMENT: 'online_payment',
    GIFT_CARD: 'gift_card',
};

export const ORDER_STATUS = {
    PENDING: 'pending',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
    RETURNED: 'returned',
};

export const USER_STATUS = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    SUSPENDED: 'suspended',
    DELETED: 'deleted',
};

export const DISCOUNT_TYPE = {
    PERCENTAGE: 'percentage',
    FIXED_AMOUNT: 'fixed_amount',
    BUY_ONE_GET_ONE: 'buy_one_get_one',
};

export const SHIPPING_METHOD = {
    STANDARD: 'standard',
    EXPRESS: 'express',
    OVERNIGHT: 'overnight',
    INTERNATIONAL: 'international',
};
export const NOTIFICATION_TYPE = {
    EMAIL: 'email',
    SMS: 'sms',
    PUSH: 'push',
    IN_APP: 'in_app',
};
export const REPORT_TYPE = {
    SALES: 'sales',
    INVENTORY: 'inventory',
    CUSTOMER: 'customer',
    FINANCIAL: 'financial',
};
export const CURRENCY = {
    USD: 'USD',
    EUR: 'EUR', 
    GBP: 'GBP',
    JPY: 'JPY',
    AUD: 'AUD',
    CAD: 'CAD',
};

