//src/validations/order.validation.js 

export const createOrderSchema = {
    customer: Joi.string().optional(),
    items: Joi.array().items(
        Joi.object({
            productId: Joi.string().required(),
            quantity: Joi.number().min(1).required(),
            price: Joi.number().min(0).required()
        }).required()
    ).min(1).required(),
    totalAmount: Joi.number().min(0).required(),
    status: Joi.string().valid('pending', 'shipped', 'delivered', 'cancelled').optional()
};

export const updateOrderSchema = {
    customer: Joi.string().optional(),
    items: Joi.array().items(
        Joi.object({
            productId: Joi.string().required(),
            quantity: Joi.number().min(1).required(),
            price: Joi.number().min(0).required()
        }).required()
    ).min(1).optional(),
    totalAmount: Joi.number().min(0).optional(),
    status: Joi.string().valid('pending', 'shipped', 'delivered', 'cancelled').optional()
};

export const getOrderSchema = {
    orderId: Joi.string().required()
};

export const deleteOrderSchema = {
    orderId: Joi.string().required()
};

