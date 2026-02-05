//src/app.js 

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import routes from './routes/index.js';
import errorHandler from './middlewares/error.middleware.js';
import logger from './utils/logger.js';

const app = express();

/* ------------ Global Middlewares ------------ */

// Enable CORS 
app.use(
    cors({
        origin: process.env.FRONTEND_URL || 'http://localhost:3000',
        credentials: true,
    })
);

// Purse JSON & URL-encoded data 
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// HTTP request logging
app.use(
    morgan('combined', {
        stream: {
            write: (message) => logger.http(message.trim()),
        },
    })
);

/* ----------- Health Check Endpoint ----------- */
app.get('/health', (reg, res) => {
    res.status(200).json({
        success: true,
        message: 'Store Management API is running smoothly!',
    });
});
/* --------------- API Routes ---------------- */
app.use('/api/v1', routes);

/* ------------ Global Error Handler ----------- */
app.use(errorHandler);

export default app.listen(process.env.PORT || 5000, () => {
    logger.info(`Server is running on port ${process.env.PORT || 5000}`);
});

