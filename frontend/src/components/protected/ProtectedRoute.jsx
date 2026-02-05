//src/components/protected/ProtectedRoute.jsx 

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

/* 
** ProtectedRoute 
** - Protects routes that require authentication
** - Redirects to login if not authenticated
 */

const ProtectedRoute = ({ redirectPath = '/login' }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;

