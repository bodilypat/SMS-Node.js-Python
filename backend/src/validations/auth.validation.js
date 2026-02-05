//src/validations/auth.validation.js 

import Joi from 'joi';

export const registerSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.ref('password'),
    role: Joi.string().valid('ADMIN', 'MANAGER','CASHIER','USER').default('user'),
}).with('password', 'confirmPassword');

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export const resetPasswordSchema = Joi.object({
    email: Joi.string().email().required(),
});

export const updatePasswordSchema = Joi.object({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().min(6).required(),
    confirmNewPassword: Joi.ref('newPassword'),
}).with('newPassword', 'confirmNewPassword');

export const verifyEmailSchema = Joi.object({
    token: Joi.string().required(),
});

export const refreshTokenSchema = Joi.object({
    refreshToken: Joi.string().required(),
});

export const logoutSchema = Joi.object({
    refreshToken: Joi.string().required(),
});

export const changeRoleSchema = Joi.object({
    userId: Joi.string().required(),
    newRole: Joi.string().valid('ADMIN', 'MANAGER','CASHIER','USER').required(),
});

export const socialLoginSchema = Joi.object({
    provider: Joi.string().valid('google', 'facebook', 'twitter').required(),
    token: Joi.string().required(),
});

export const updateProfileSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30),
    email: Joi.string().email(),
    avatarUrl: Joi.string().uri(),
});

export const deleteUserSchema = Joi.object({
    userId: Joi.string().required(),
});

export const getUserSchema = Joi.object({
    userId: Joi.string().required(),
});

export const listUsersSchema = Joi.object({
    page: Joi.number().min(1).default(1),
    limit: Joi.number().min(1).max(100).default(10),
    role: Joi.string().valid('ADMIN', 'MANAGER','CASHIER','USER'),
    search: Joi.string().allow(''),
});

export const lockUserSchema = Joi.object({
    userId: Joi.string().required(),
    lock: Joi.boolean().required(),
});

