//src/providers/payment.provider.js 

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_API_KEY);

export const createPaymentIntent = async (amount, currency) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            metadata,
        });

        logger.info(`Payment intent created with ID: ${paymentIntent.id}`);
        return paymentIntent;
    } catch (error) {
        logger.error('Error creating payment intent:', error);
        throw new Error('Failed to create payment intent');
    }
};

export const capturePayment = async (paymentIntentId) => {
    try {
        const paymentIntent = await stripe.paymentIntents.capture(paymentIntentId);
        logger.info(`Payment intent captured with ID: ${paymentIntent.id}`);
        return paymentIntent;
    } catch (error) {
        logger.error('Error capturing payment intent:', error);
        throw new Error('Failed to capture payment intent');
    }
};  

