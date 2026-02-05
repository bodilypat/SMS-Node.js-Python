//src/validations/validate.validation.js 

const validate = (schema, property = 'body') => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req[property], { abortEarly: false });

        if (error) {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: error.details.map(detail => detail.message),
            });
        }

        req[property] = value; 
        next();
    };
};

export default validate;

