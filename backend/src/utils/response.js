//src/utils/response.js 

export const success = (res, data = null, message = "Success", status = 200 ) => {
    return res.status(status).json({
        success: true,
        message,
        data,
    }); 
};

export const error = (
    res,
    message = "An error occurred",
    status = 500,
    error = null
) => {
    return res.status(status).json({
        success: false,
        message,
        error: error ? error.message || error : null
    });
};

export const notFound = (res, message = "Resource not found") => {
    return res.status(404).json({
        success: false,
        message,
    });
};

export const unauthorized = (res, message = "Unauthorized access") => {
    return res.status(401).json({
        success: false,
        message,
    });
};

export const badRequest = (res, message = "Bad request", error = null) => {
    return res.status(400).json({
        success: false, 
        message,
        error: error ? error.message || error : null
    });
};

export const forbidden = (res, message = "Forbidden access") => {
    return res.status(403).json({
        success: false,
        message,
    });
};

export const created = (res, data = null, message = "Resource created") => {
    return res.status(201).json({
        success: true,
        message,
        data,
    });
};

export const noContent = (res) => {
    return res.status(204).send();
};

export const conflict = (res, message = "Conflict occurred", error = null) => {
    return res.status(409).json({
        success: false,
        message,
        error: error ? error.message || error : null
    });
};

export const tooManyRequests = (res, message = "Too many requests") => {
    return res.status(429).json({
        success: false,
        message,
    });
};

export const internalServerError = (res, message = "Internal server error", error = null) => {
    return res.status(500).json({
        success: false,
        message,
        error: error ? error.message || error : null
    });
};

