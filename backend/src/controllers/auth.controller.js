//src/controllers/auth_controller.js 

import * as authService from '../services/auth_service.js';
import { success } from '../utils/response.js';

export const register = async (req, res, next) => {
    try {
        const user = await authService.register(req.body);
        success(res,user, 'User registered successfully');
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const result = await authService.login(req.body.email, req.body.password);
        success(res,result, 'User logged in successfully');
    } catch (error) {
        next(error);
    }
};

export const logout = async (req, res, next) => {
    try {
        await authService.logout(req.user.id);
        success(res, null, 'User logged out successfully');
    } catch (error) {
        next(error);
    }
};

export const refreshToken = async (req, res, next) => {
    try {
        const tokens = await authService.refreshToken(req.body.refreshToken);
        success(res,tokens, 'Token refreshed successfully');
    } catch (error) {
        next(error);
    }
};

export const forgotPassword = async (req, res, next) => {
    try {
        await authService.forgotPassword(req.body.email);
        success(res, null, 'Password reset email sent successfully');
    } catch (error) {
        next(error);
    }
};

export const resetPassword = async (req, res, next) => {
    try {
        await authService.resetPassword(req.body.token, req.body.newPassword);
        success(res, null, 'Password reset successfully');
    } catch (error) {
        next(error);
    }
};

export const verifyEmail = async (req, res, next) => {
    try {
        await authService.verifyEmail(req.body.token);
        success(res, null, 'Email verified successfully');
    } catch (error) {
        next(error);
    }
};

export const changePassword = async (req, res, next) => {
    try {
        await authService.changePassword(req.user.id, req.body.currentPassword, req.body.newPassword);
        success(res, null, 'Password changed successfully');
    } catch (error) {
        next(error);
    }
};

