//src/server.js 

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app.js';
import logger from './utils/logger.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/TakeComStore';

/* ------------ MongoDB Connection ------------ */
mongoose.connect(MONGO_URI, {
        autoIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        logger.info('Connected to MongoDB');

        app.listen(PORT, () => {
            logger.info(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        logger.error('Error connecting to MongoDB:', error);
        process.exit(1);
    });

/* ------------ Graceful Shutdown ------------ */
const shutdown = async (singal) => {
        logger.info(`Received ${singal}. Closing server...`);
        await mongoose.connection.close();
        logger.info('MongoDB connection closed.');
        process.exit(0);
    };
    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));

/* ----------- Unhandled Errors ------------ */
process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
    shutdown('unhandledRejection');
});

process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception thrown:', error);
    shutdown('uncaughtException');
});



