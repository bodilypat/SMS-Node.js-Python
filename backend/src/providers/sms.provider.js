//src/providers/sms.provider.js 

import Twilio from 'twilio';
import logger from '../utils/logger.js';

const client = Twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

export const sendSMS = async (to, body) => {
    try {

        const message = await client.messages.create({
            body,
            from: process.env.TWILIO_PHONE_NUMBER,
            to
        });
        logger.info(`SMS sent to ${to}: ${message.sid}`);
        return message;
    } catch (error) {
        logger.error(`Failed to send SMS to ${to}: ${error.message}`);
        throw error;
    }
};

